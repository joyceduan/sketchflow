class CreateDrawings < ActiveRecord::Migration[5.1]
  def change
    create_table :drawings do |t|
      t.integer :parent_id
      t.integer :drawing_id

      t.timestamps
    end
  end
end
