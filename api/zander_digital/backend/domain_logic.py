from database.database import db
from database.dtos import Skill


def create_skill(data):
    name = data.get('name')
    product = Skill(name)
    db.add(product)

def read_product(data):
    pass

def update_product(data):
    pass

def delete_product(data):
    pass
