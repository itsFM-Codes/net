variable "proxmox_api_url" {
    type = string
    sensitive = true
  
}
variable "proxmox_api_token_id" {
  type = string
  sensitive = true 
}

variable "proxmox_api_token_secret" {
  type = string
  sensitive = true 
}

variable "target_node" {
  type = string
}

variable "template_id" {
  type = number
}

variable "worker_count" {
  type = number
  default = 2
}
variable "control_plane_count" {
  type        = number
  default = 3
}
variable "control_plane_cores" {
  type = number
}

variable "control_plane_memory" {
  type = number
}

variable "worker_cores" {
  type = number
}

variable "worker_memory" {
    type = number 
  
}

variable "lb_cores" {
  type = number
}

variable "lb_memory" {
  type = number
}

variable "ssh_public_key" {
  type      = string
  sensitive = true
}