class AddDataUrlToDrawings < ActiveRecord::Migration[5.1]
  def change
    add_column :drawings, :data_url, :string
  end
end
