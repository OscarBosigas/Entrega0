from flask_sqlalchemy import SQLAlchemy
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow import fields

db = SQLAlchemy()


class Eventos(db.Model):
    Id = db.Column(db.Integer, primary_key=True)
    Nombre = db.Column(db.String(64))
    Lugar = db.Column(db.String(64))
    Direccion = db.Column(db.String(64))
    Fecha_Inicio = db.Column(db.String(64))
    Fecha_Final = db.Column(db.String(64))
    Id_Categoria = db.Column(db.Integer, db.ForeignKey('categorias.Id'))
    Id_Tipo = db.Column(db.Integer, db.ForeignKey('tipos.Id'))
    Id_Usuario = db.Column(db.Integer, db.ForeignKey('usuarios.id'))

class Usuarios(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(64))
    contrasena = db.Column(db.String(32))
    eventos = db.relationship(Eventos, cascade = 'all, delete-orphan')

class Tipos(db.Model):
    Id = db.Column(db.Integer, primary_key=True)
    Nombre = db.Column(db.String(64))

class Categorias(db.Model):
    Id = db.Column(db.Integer, primary_key=True)
    Nombre = db.Column(db.String(64))

class UsuarioSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Usuarios
        include_relationships = True
        load_instance = True

class EventosSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Eventos
        include_relationships = True
        load_instance = True