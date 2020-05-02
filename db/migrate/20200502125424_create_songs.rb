class CreateSongs < ActiveRecord::Migration[6.0]
  def change
    create_table :songs, id: :uuid do |t|
      t.string :name
      t.integer :time
      t.string :artist
      t.string :album

      t.timestamps
    end
  end
end
