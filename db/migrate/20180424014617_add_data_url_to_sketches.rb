class AddDataUrlToSketches < ActiveRecord::Migration[5.1]
  def change
    add_column :sketches, :data_url, :string
  end
end
