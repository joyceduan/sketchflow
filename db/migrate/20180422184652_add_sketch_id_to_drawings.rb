class AddSketchIdToDrawings < ActiveRecord::Migration[5.1]
  def change
    add_column :drawings, :sketch_id, :integer
  end
end
