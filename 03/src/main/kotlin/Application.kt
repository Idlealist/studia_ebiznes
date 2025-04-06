import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.websocket.*
import io.ktor.websocket.*
import kotlinx.coroutines.*
import kotlinx.serialization.*
import kotlinx.serialization.json.*
import io.github.cdimascio.dotenv.Dotenv
import io.ktor.http.*
import io.ktor.client.request.*
import io.ktor.client.statement.*

val dotenv = Dotenv.load() 
val token = dotenv["DISCORD_TOKEN"] ?: throw IllegalStateException("DISCORD_TOKEN not found in .env")
val bot_id = dotenv["DISCORD_BOT_ID"] ?: throw IllegalStateException("DISCORD_BOT_ID not found in .env")

@Serializable
data class Payload(
    val op: Int, 
    val d: JsonElement? = null, 
    val s: Int? = null, 
    val t: String? = null
)

@Serializable
data class Identify(
    val token: String,
    val properties: Map<String, String>,
    val intents: Int
)

val categories = listOf("Electronics", "Clothing", "Books")

val products = mapOf(
    "Electronics" to listOf("Smartphone", "Laptop", "Headphones"),
    "Clothing" to listOf("Shirt", "Pants", "Jacket"),
    "Books" to listOf("Man In The High Castle", "The Hobbit"),
)

suspend fun sendMessage(channelId: String, message: String, client: HttpClient) {
    val url = "https://discord.com/api/v10/channels/$channelId/messages"
    
    val response: HttpResponse = client.post(url) {
        headers {
            append(HttpHeaders.Authorization, "Bot $token")
        }
        contentType(ContentType.Application.Json)
        setBody("""{"content": "$message"}""")
    }
    
    println("Response Status: ${response.status}")
}

suspend fun handleMessage(content: String, channelId: String, client: HttpClient, json: Json) {
    val message = content.trim()

    when {
        message == "/categories" -> {
            val response = categories.joinToString(", ")
            sendMessage(channelId, "Available categories: $response", client)
        }

        message.startsWith("/products") -> {
            val category = message.removePrefix("/products").trim()

            if (category in products) {
                val response = products[category]?.joinToString(", ")
                sendMessage(channelId, "Products in $category: $response", client)
            } else {
                sendMessage(channelId, "Category not found!", client)
            }
        }

        else -> {
            sendMessage(
                channelId, 
                "Try one of the following: \\n" + 
                "/categories\\n"+
                "/products <category>\\n",
                client
            )
        }
    }
}


suspend fun main() {
    val client = HttpClient(CIO) {
        install(WebSockets)
    }
    val json = Json { ignoreUnknownKeys = true }

    val session = client.webSocket("wss://gateway.discord.gg/?v=10&encoding=json") {
        var heartbeat = 0L

        for (frame in incoming) {
            val text = (frame as? Frame.Text)?.readText() ?: continue
            val payload = json.decodeFromString<Payload>(text)

            when (payload.op) {
                10 -> {
                    heartbeat = payload.d!!.jsonObject["heartbeat_interval"]!!.jsonPrimitive.long

                    val identify = Payload(
                        op = 2,
                        d = json.encodeToJsonElement(
                            Identify(
                                token,
                                mapOf(
                                    "\$os" to "linux",
                                    "\$browser" to "ktor",
                                    "\$device" to "ktor"
                                ),
                                intents = 1 or 512 or 32768 // GUILD_MESSAGES (1), DMs (512), MESSAGE_CONTENT (32768)
                            )
                        )
                    )
                    send(Frame.Text(json.encodeToString(identify)))

                    launch {
                        while (true) {
                            send(Frame.Text(json.encodeToString(Payload(1, JsonNull))))
                            delay(heartbeat)
                        }
                    }
                }

                0 -> {
                    if (payload.t == "MESSAGE_CREATE") {
                        val mentions = payload.d?.jsonObject?.get("mentions")?.jsonArray

                        val botMentioned = mentions?.any {
                            it.jsonObject["id"]?.jsonPrimitive?.content == bot_id
                        } ?: false

                        if(botMentioned){
                            val channelId = payload.d.jsonObject["channel_id"]!!.jsonPrimitive.content
                            val author = payload.d!!.jsonObject["author"]!!.jsonObject["username"]!!.jsonPrimitive.content
                            val content = payload.d.jsonObject["content"]?.jsonPrimitive?.content
                            val cleanContent = content?.replace(Regex("<@\\d+>"), "") ?: "" 

                            if (content.isNullOrEmpty()) {
                                println("$author: no content")
                            } else {
                                println("$author: $cleanContent")
                            }
                            handleMessage(cleanContent, channelId, client, json)
                        }

                    }
                }
            }
        }
    }
}
