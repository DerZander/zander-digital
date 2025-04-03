from database.database import db


class BaseModel(db.Model):
    __abstract__ = True

    def as_dict(self, include_relationships=True, recurse_level=1):
        result = {}
        for column in self.__table__.columns:
            value = getattr(self, column.name)
            if hasattr(value, 'isoformat'):
                value = value.isoformat()
            result[column.name] = value

        if include_relationships and recurse_level > 0:
            for rel in self.__mapper__.relationships:
                related_obj = getattr(self, rel.key)
                if related_obj is None:
                    result[rel.key] = None
                elif hasattr(related_obj, 'all'):
                    # Handle dynamic relationships
                    result[rel.key] = [item.as_dict(include_relationships=False) for item in related_obj.all()]
                elif isinstance(related_obj, list):
                    result[rel.key] = [item.as_dict(include_relationships=False) for item in related_obj]
                else:
                    result[rel.key] = related_obj.as_dict(include_relationships=False)
        return result
