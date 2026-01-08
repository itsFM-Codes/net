output "control_plane_ips" {
  value = proxmox_vm_qemu.control_plane[*].default_ipv4_address
}

output "worker_ips" {
  value = proxmox_vm_qemu.workers[*].default_ipv4_address
}

output "loadbalancer_ip" {
  value = proxmox_vm_qemu.loadbalancer.default_ipv4_address
}
