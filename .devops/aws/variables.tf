variable "region" {
  type        = string
  default     = "us-east-1"
}

variable "image_tag" {
  description = "image tag"
  default = "latest"
  type        = string
}
