from flask_restful import Resource
from flask import request
from flask_jwt_extended import jwt_required, create_access_token
from ..modelos import *

eventoSchema = EventosSchema() 
usaurioSchema = UsuarioSchema()
tiposSchema = TiposSchema()
categoriaSchema = CategoriasSchema()

class SignIn(Resource):
    def post(self):
            nuevo_usuario = Usuarios(nombre=request.json["nombre"], contrasena=request.json["contrasena"])
            token_de_Acceso = create_access_token(identity=request.json["nombre"])
            db.session.add(nuevo_usuario)
            db.session.commit()
            return {'menaje':'Usuario creado', 'token_de_acceso':token_de_Acceso}

class CrearEventos(Resource):
    def post(self):
        nuevo_evento = Eventos(Nombre=request.json["Nombre"],
        Lugar = request.json["Lugar"],
        Direccion = request.json["Direccion"],
        Fecha_Inicio = request.json["Fecha_Inicio"],
        Fecha_Final = request.json["Fecha_Final"],
        Id_Categoria = request.json["Id_Categoria"],
        Id_Tipo = request.json["Id_Tipo"],
        Id_Usuario = request.json["Id_Usuario"])
        db.session.add(nuevo_evento)
        db.session.commit()
        return eventoSchema.dump(nuevo_evento)


class ListaEventos(Resource):
    def get(self):
        return [eventoSchema.dump(evento) for evento in Eventos.query.all()]


class Evento(Resource):
    def get(self, id_evento):
        return eventoSchema.dump(Eventos.query.get_or_404(id_evento))


class Actualizar(Resource):
    def put(self, id_evento):
        evento = Eventos.query.get_or404(id_evento)
        evento.Nombre = request.json.get['nombre', evento.Nombre]
        evento.Lugar = request.json.get['lugar', evento.Lugar]
        evento.Direccion = request.json.get['direccion', evento.Direccion]
        evento.Fecha_Inicio = request.json.get['fecha_inicio', evento.Fecha_Inicio]
        evento.Fecha_Fin = request.json.get['fecha_final', evento.Fecha_Fin]
        evento.Id_Tipo = request.json.get['tipo', evento.Id_Tipo]
        evento.Id_Categoria = request.json.get['categoria', evento.Id_Categoria]
        return eventoSchema.dump(evento)


class Eliminar(Resource):
    def delete(self, id_evento):
        evento = Eventos.query.get_or_404(id_evento)
        db.session.delete(evento)
        db.session.commit()
        return 'Eliminado exitosamente', 204

class EventosUsuario(Resource):
  
    def get(self, id_usuario):
        usuario = Usuarios.query.get_or_404(id_usuario)
        return [eventoSchema.dump(al) for al in usuario.eventos]

class LogIn(Resource):
    def post(self):
        u_nombre = request.json["nombre"]
        u_contrasena = request.json["contrasena"]
        usuario = Usuarios.query.filter_by(nombre=u_nombre, contrasena=u_contrasena).first()
        if usuario:
            return {'mensaje':'Inicio de sesion'}, 200
        else:
            return {'mensaje':'Usuario no encontrado'}, 400

class getTipo(Resource):
    def get(self, id_tipo):
        return tiposSchema.dump(Tipos.query.get_or_404(id_tipo))

class getCategoria(Resource):
    def get(self, id_categoria):
        return categoriaSchema.dump(Categorias.query.get_or_404(id_categoria))

class getUsuario(Resource):
    def post(self):
        u_nombre = request.json["nombre"]
        return usaurioSchema.dump(Usuarios.query.filter_by(nombre=u_nombre).first())
        