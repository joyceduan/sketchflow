json.extract! drawing, :id, :parent_id, :drawing_id, :created_at, :updated_at
json.url drawing_url(drawing, format: :json)
