class CreateBranches < ActiveRecord::Migration[5.1]
  def change
    create_table :branches do |t|
      t.integer :parent_id

      t.timestamps
    end
  end
end
