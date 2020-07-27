class CreateImages < ActiveRecord::Migration[6.0]
  def change
    create_table :images do |t|
      t.integer :upvote_count
      t.integer :downvote_count
    end
  end
end
