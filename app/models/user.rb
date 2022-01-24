class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

  attr_accessor :reset_token

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # has_secure_password

  has_many :plaid_auths
  has_many :financials
  has_many :credit_scores
  has_many :alerts

  def legal_name
    "#{self.first_name} #{self.last_name}"
  end

  def last_payoff
    self.financials.where(is_payoff: true).order(id: :desc).first
  end

  # Sets the password reset attributes.
  def create_reset_digest
    self.reset_token = User.new_token
    update_attributes(reset_digest: User.digest(reset_token), reset_sent_at: Time.zone.now)
  end

  def self.digest(string)
    Digest::SHA256.base64digest(string)
  end

  # Returns a random token.
  def self.new_token
    SecureRandom.urlsafe_base64
  end

  # Return true if password reset link expires
  def password_reset_expired?
    reset_sent_at < 2.hours.ago
  end
end
