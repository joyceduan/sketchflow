class AddImageToSketch < ActiveRecord::Migration[5.1]
  def change
    add_column :sketches, :image, :string
  end
end
