ActiveAdmin.register Song do
  permit_params songs: []

  controller do
    def create
      songs = params[:song][:songs]
      songs.each do |s|
        data = SongMetaDataExtractor.new(file: s).data
        song = Song.new(data)
        song.url = s
        song.save
      end
      redirect_to '/admin/songs'
    end
  end

  show do
    h3 song.name
    h5 song.artist
    h5 song.album
    h5 song.time
    div do
      link_to(song.url.service_url, song.url.service_url)
    end
  end

  form(html: { multipart: true }) do |f|
    f.inputs do
      f.file_field :songs, multiple: true
    end
    f.actions do
      f.submit 'Upload Songs', as: :button
    end
  end

end
