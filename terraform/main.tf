terraform {
    required_version = ">= 1.13.0"
  required_providers {
    proxmox = {
        source = "telmate/proxmox"
        version = "2.9.3"
    }
  }
}

provider "proxmox" {
  pm_api_url = var.proxmox_api_url
  pm_api_token_id = var.proxmox_api_token_id
  pm_api_token_secret = var.proxmox_api_token_secret
}

resource "proxmox_vm_qemu" "workers" {
    count = var.worker_count
    name   = "k8s-worker-${count.index}"
    target_node = var.target_node
    clone = var.template_id
    full_clone = true
    cores = var.worker_cores
    memory = var.worker_memory
    sshkeys = var.ssh_public_key
    network{
        model = "virtio"
        bridge = "vmbr0"
    }
    ipconfig0 = "ip=dhcp"
  
}

resource "proxmox_vm_qemu" "control_plane" {
    count       = var.control_plane_count
    name        = "k8s-control-${count.index}"
    target_node = var.target_node
    clone = var.template_id
    full_clone = true
    cores  = var.control_plane_cores
    memory = var.control_plane_memory
    sshkeys = var.ssh_public_key
    network{
        model = "virtio"
        bridge = "vmbr0"
    }
    ipconfig0 = "ip=dhcp"
}

resource "proxmox_vm_qemu" "loadbalancer" {
    name="k8s-lb"
    target_node = var.target_node
    clone = var.template_id
    full_clone = true
    cores  = var.lb_cores
    memory = var.lb_memory
    sshkeys = var.ssh_public_key
    network{
        model = "virtio"
        bridge = "vmbr0"
    }
    ipconfig0 = "ip=dhcp"
}