class Sketch < ApplicationRecord
	belongs_to :user
	has_many :branches
	validates :description, presence: true, length: { maximum: 140 }
	validates :title, presence: true, length: { maximum: 60 }
	mount_uploader :image, ImageUploader
end
