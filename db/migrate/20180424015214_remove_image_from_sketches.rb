class RemoveImageFromSketches < ActiveRecord::Migration[5.1]
  def change
    remove_column :sketches, :image
  end
end
