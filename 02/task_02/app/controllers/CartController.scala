package controllers

import play.api.mvc._
import play.api.libs.json._
import models.CartItem

import javax.inject._
import scala.collection.mutable.ArrayBuffer

@Singleton
class CartController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {
    private val cartItems = ArrayBuffer[CartItem]()

    implicit val cartItemFormat: OFormat[CartItem] = Json.format[CartItem]

    def getAll: Action[AnyContent] = Action(Ok(Json.toJson(cartItems)))

    def getById(id: Int): Action[AnyContent] = Action {
        cartItems.find(_.id == id)
            .map(item => Ok(Json.toJson(item)))
            .getOrElse(NotFound("Cart item not found"))
    }

    def add: Action[JsValue] = Action(parse.json) { request =>
        request.body.validate[CartItem]
            .map { cartItem =>
                cartItems += cartItem
                Created(Json.toJson(cartItem))
            }
            .getOrElse(BadRequest("Invalid data"))
    }

    def update(id: Int): Action[JsValue] = Action(parse.json) { request =>
        request.body.validate[CartItem]
            .map { updatedItem =>
                cartItems.find(_.id == id) match {
                    case Some(_) =>
                        cartItems.mapInPlace(item => if (item.id == id) updatedItem else item)
                        Ok(Json.toJson(updatedItem))
                    case None => NotFound("Cart item not found")
                }
            }
            .getOrElse(BadRequest("Invalid data"))
    }

    def delete(id: Int): Action[AnyContent] = Action {
        if (cartItems.exists(_.id == id)) {
            cartItems.filterInPlace(_.id != id)
            NoContent
        } else NotFound("Cart item not found")
    }
}
