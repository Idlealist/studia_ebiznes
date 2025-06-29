# studia_ebiznes

**Zadanie 1** Docker

:white_check_mark: 3.0 obraz ubuntu z Pythonem w wersji 3.10
:white_check_mark: 3.5 

:white_check_mark: 4.0 obraz ubuntu:24.02 z Javą w wersji 8 oraz Kotlinem

:white_check_mark: 4.5 wymaganie 4 do powyższego należy dodać najnowszego Gradle’a oraz paczkę JDBC
SQLite w ramach projektu na Gradle (build.gradle)

:x: 5.0 wymaganie 5 stworzyć przykład typu HelloWorld oraz uruchomienie aplikacji
przez CMD oraz gradle


Kod: [link](https://github.com/Idlealist/studia_ebiznes/tree/main/01)

**Zadanie 2** Scala

:white_check_mark: 3.0 Należy stworzyć kontroler do Produktów 

:white_check_mark: 3.5 Do kontrolera należy stworzyć endpointy zgodnie z CRUD - dane
pobierane z listy

:white_check_mark: 4.0 Należy stworzyć kontrolery do Kategorii oraz Koszyka + endpointy
zgodnie z CRUD

:x: 4.5  Należy aplikację uruchomić na dockerze (stworzyć obraz) oraz dodać
skrypt uruchamiający aplikację via ngrok


:x: 5.0 Należy dodać konfigurację CORS dla dwóch hostów dla metod CRUD


Kod: [link](https://github.com/Idlealist/studia_ebiznes/tree/main/02)

**Zadanie 3** Kotlin

:white_check_mark: 3.0 Należy stworzyć aplikację kliencką w Kotlinie we frameworku Ktor,
która pozwala na przesyłanie wiadomości na platformę Discord

:white_check_mark: 3.5 Aplikacja jest w stanie odbierać wiadomości użytkowników z
platformy Discord skierowane do aplikacji (bota)

:white_check_mark: 4.0 Zwróci listę kategorii na określone żądanie użytkownika

:white_check_mark: 4.5  Zwróci listę produktów wg żądanej kategorii


:x: 5.0 Aplikacja obsłuży dodatkowo jedną z platform: Slack, Messenger,
Webex


Kod: [link](https://github.com/Idlealist/studia_ebiznes/tree/main/03)

**Zadanie 4** Go Echo

:white_check_mark: 3.0 Należy stworzyć aplikację we frameworki echo w j. Go, która będzie miała kontroler Produktów zgodny z CRUD

:white_check_mark: 3.5 Należy stworzyć model Produktów wykorzystując gorm oraz
wykorzystać model do obsługi produktów (CRUD) w kontrolerze (zamiast
listy)

:white_check_mark: 4.0 Należy dodać model Koszyka oraz dodać odpowiedni endpoint

:white_check_mark: 4.5 Należy stworzyć model kategorii i dodać relację między kategorią,
a produktem

:white_check_mark: 5.0 pogrupować zapytania w gorm’owe scope'y

Kod: [link](https://github.com/Idlealist/studia_ebiznes/tree/main/04)

**Zadanie 5** Frontend React

:white_check_mark: 3.0 W ramach projektu należy stworzyć dwa komponenty: Produkty oraz
Płatności; Płatności powinny wysyłać do aplikacji serwerowej dane, a w
Produktach powinniśmy pobierać dane o produktach z aplikacji
serwerowej;

:white_check_mark: 3.5 Należy dodać Koszyk wraz z widokiem; należy wykorzystać routing

:white_check_mark: 4.0 Dane pomiędzy wszystkimi komponentami powinny być przesyłane za
pomocą React hooks

:white_check_mark: 4.5 Należy dodać skrypt uruchamiający aplikację serwerową oraz
kliencką na dockerze via docker-compose

:white_check_mark: 5.0 Należy wykorzystać axios’a oraz dodać nagłówki pod CORS

Kod: [link](https://github.com/Idlealist/studia_ebiznes/tree/main/05)



**Zadanie 6** Testy

:white_check_mark: 3.0 Należy stworzyć 20 przypadków testowych w CypressJS lub Selenium
(Kotlin, Python, Java, JS, Go, Scala)

:white_check_mark: 3.5 Należy rozszerzyć testy funkcjonalne, aby zawierały minimum 50
asercji

:white_check_mark: 4.0 Należy stworzyć testy jednostkowe do wybranego wcześniejszego
projektu z minimum 50 asercjami

:white_check_mark: 4.5 Należy dodać testy API, należy pokryć wszystkie endpointy z
minimum jednym scenariuszem negatywnym per endpoint

:x: 5.0 Należy uruchomić testy funkcjonalne na Browserstacku


Kod: [link](https://github.com/Idlealist/studia_ebiznes/tree/main/06)

**Zadanie 7** Sonar

:white_check_mark: 3.0 Należy dodać litera do odpowiedniego kodu aplikacji serwerowej w
hookach gita

:white_check_mark: 3.5 Należy wyeliminować wszystkie bugi w kodzie w Sonarze (kod
aplikacji serwerowej)

:white_check_mark: 4.0 Należy wyeliminować wszystkie zapaszki w kodzie w Sonarze (kod
aplikacji serwerowej)

:white_check_mark: 4.5 Należy wyeliminować wszystkie podatności oraz błędy bezpieczeństwa
w kodzie w Sonarze (kod aplikacji serwerowej)

:white_check_mark: 5.0 Należy wyeliminować wszystkie błędy oraz zapaszki w kodzie
aplikacji klienckiej


Kod: 
[server repo](https://github.com/Idlealist/studia_sonar_sever)
[client repo](https://github.com/Idlealist/studia_sonar_client)

**Zadanie 8** Oauth2

:white_check_mark: 3.0 logowanie przez aplikację serwerową (bez Oauth2)

:white_check_mark: 3.5 rejestracja przez aplikację serwerową (bez Oauth2)

:white_check_mark: 4.0 logowanie via Google OAuth2

:white_check_mark: 4.5 logowanie via Facebook lub Github OAuth2

:white_check_mark: 5.0 zapisywanie danych logowania OAuth2 po stronie serwera

Kod: [link](https://github.com/Idlealist/studia_ebiznes/tree/main/08)

**Zadanie 9** Zadanie 9 ChatGPT bot

:white_check_mark:  3.0 należy stworzyć po stronie serwerowej osobny serwis do łącznia z
chatGPT do usługi chat

:white_check_mark: 3.5 należy stworzyć interfejs frontowy dla użytkownika, który
komunikuje się z serwisem; odpowiedzi powinny być wysyałen do
frontendowego interfejsu


:x: 4.0 stworzyć listę 5 różnych otwarć oraz zamknięć rozmowy

:x: 4.5 filtrowanie po zagadnieniach związanych ze sklepem (np.
ograniczenie się jedynie do ubrań oraz samego sklepu) do GPT

:x: 5.0 filtrowanie odpowiedzi po sentymencie

Kod: [link](https://github.com/Idlealist/studia_ebiznes/tree/main/09)

**Zadanie 10** Zadanie 10 Chmura/CI

:white_check_mark: 3.0 Należy stworzyć odpowiednie instancje po stronie chmury na
dockerze

:white_check_mark: 3.5 Stworzyć odpowiedni pipeline w Github Actions do budowania
aplikacji (np. via fatjar)

:white_check_mark: 4.0 Dodać notyfikację mailową o zbudowaniu aplikacji

:white_check_mark: 4.5 Dodać krok z deploymentem aplikacji serwerowej oraz klienckiej na
chmurę

:x: 5.0 Dodać uruchomienie regresyjnych testów automatycznych
(funkcjonalnych) jako krok w Actions

Kod: [link](https://github.com/Idlealist/studia_ebiznes/tree/main/10)
