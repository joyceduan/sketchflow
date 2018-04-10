class CreateSketches < ActiveRecord::Migration[5.1]
  def change
    create_table :sketches do |t|
      t.text :title
      t.text :description
      t.integer :user_id

      t.timestamps
    end
  end
end
