class CreateDrawings < ActiveRecord::Migration[5.1]
  def change
    create_table :drawings do |t|
      t.integer :branch_id

      t.timestamps
    end
  end
end
