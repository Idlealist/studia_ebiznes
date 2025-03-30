package controllers

import play.api.mvc._
import play.api.libs.json._
import models.Category

import javax.inject._
import scala.collection.mutable.ArrayBuffer

@Singleton
class CategoryController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {
    private val categories = ArrayBuffer(
        Category(1, "Electronics"),
        Category(2, "Furniture")
    )

    implicit val categoryFormat: OFormat[Category] = Json.format[Category]

    def getAll: Action[AnyContent] = Action(Ok(Json.toJson(categories)))

    def getById(id: Int): Action[AnyContent] = Action {
        categories.find(_.id == id)
            .map(c => Ok(Json.toJson(c)))
            .getOrElse(NotFound("Category not found"))
    }

    def add: Action[JsValue] = Action(parse.json) { request =>
        request.body.validate[Category]
            .map { category =>
                categories += category
                Created(Json.toJson(category))
            }
            .getOrElse(BadRequest("Invalid data"))
    }

    def update(id: Int): Action[JsValue] = Action(parse.json) { request =>
        request.body.validate[Category]
            .map { updatedCategory =>
                categories.find(_.id == id) match {
                    case Some(_) =>
                        categories.mapInPlace(c => if (c.id == id) updatedCategory else c)
                        Ok(Json.toJson(updatedCategory))
                    case None => NotFound("Category not found")
                }
            }
            .getOrElse(BadRequest("Invalid data"))
    }

    def delete(id: Int): Action[AnyContent] = Action {
        if (categories.exists(_.id == id)) {
            categories.filterInPlace(_.id != id)
            NoContent
        } else NotFound("Category not found")
    }
}
