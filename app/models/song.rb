class Song < ApplicationRecord
  has_one_attached :url

  def songs
    []
  end

end
