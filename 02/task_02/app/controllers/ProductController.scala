package controllers

import play.api.mvc._
import play.api.libs.json._

import models.Product

import javax.inject._
import scala.collection.mutable.ArrayBuffer

@Singleton
class ProductController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {
    private val products = ArrayBuffer(
        Product(1, "Laptop", 3000, 1),
        Product(2, "Smartphone", 2000, 1)
    )

    implicit val productFormat: OFormat[Product] = Json.format[Product]

    def getAll: Action[AnyContent] = Action(Ok(Json.toJson(products)))

    def getById(id: Int): Action[AnyContent] = Action {
        products.find(_.id == id)
            .map(p => Ok(Json.toJson(p)))
            .getOrElse(NotFound("Product not found"))
    }

    def add: Action[JsValue] = Action(parse.json) { request =>
        request.body.validate[Product]
            .map { product =>
                products += product
                Created(Json.toJson(product))
            }
            .getOrElse(BadRequest("Invalid data"))
    }

    def update(id: Int): Action[JsValue] = Action(parse.json) { request =>
        request.body.validate[Product]
            .map { updatedProduct =>
                products.find(_.id == id) match {
                    case Some(_) =>
                        products.mapInPlace(p => if (p.id == id) updatedProduct else p)
                        Ok(Json.toJson(updatedProduct))
                    case None => NotFound("Product not found")
                }
            }
            .getOrElse(BadRequest("Invalid data"))
    }

    def delete(id: Int): Action[AnyContent] = Action {
        if (products.exists(_.id == id)) {
            products.filterInPlace(_.id != id)
            NoContent
        } else NotFound("Product not found")
    }
}
