class Song < ApplicationRecord
  has_one_attached :url

  def self.all_songs
    path = "https://#{ENV['AWS_BUCKET']}.s3.#{ENV['AWS_REGION']}.amazonaws.com/"
    @data = {}
    @data[:mediaPath] = path
    @data[:extension] = ''
    @data[:tracks] = []

    self.all.each_with_index do |s,i|
      @data[:tracks] << {id: s.id, track: i + 1, name: s.name, artist: s.artist, album: s.album, duration: Time.at(s.time).utc.strftime("%M:%S"), src:  path + s.url.key, type: 'audio/mp3'}
    end
    @data
  end

  def songs
    []
  end

end
