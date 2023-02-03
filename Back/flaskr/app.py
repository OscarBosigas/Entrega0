from flaskr import create_app
from flask import jsonify
from .modelos import *
from .vistas import *
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS

app = create_app('default')
app_context = app.app_context()
app_context.push()

db.init_app(app)
db.create_all()

CORS = CORS(app)

api = Api(app)
api.add_resource(SignIn, '/signin')
api.add_resource(ListaEventos, '/lista')
api.add_resource(CrearEventos, '/crear')
api.add_resource(Evento, '/evento/<int:id_evento>')
api.add_resource(Eliminar, '/eliminar/<int:id_evento>')
api.add_resource(Actualizar, '/actualizar/<int:id_evento>')
api.add_resource(EventosUsuario, '/usuario/<int:id_usuario>/eventos')
api.add_resource(LogIn, '/login')
api.add_resource(getCategoria, '/categoria/<int:id_categoria>')
api.add_resource(getTipo,'/tipo/<int:id_tipo>')
api.add_resource(getUsuario, '/usuarios')

jwt = JWTManager(app)
