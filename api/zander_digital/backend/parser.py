from flask_restx import reqparse

pagination_parser = reqparse.RequestParser()
pagination_parser.add_argument('page', type=int, required=True, default=1, help='The page number')
pagination_parser.add_argument('per_page', type=int, required=True, choices=[5, 10, 20, 30, 40, 50], default=30, help='The number of items per page')