class CreateSeeds < ActiveRecord::Migration[6.0]
  def change
    create_table :seeds do |t|
      t.references :image
      t.string :algo_name
      t.string :image_name
      t.string :seed_hash

    end
  end
end
