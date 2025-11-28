# Ansible Installation and Setup Guide

Complete guide for installing and configuring Ansible for the Hospital Management System deployment.

## 📋 Table of Contents

1. [Windows Installation](#windows-installation)
2. [Linux Installation](#linux-installation)
3. [macOS Installation](#macos-installation)
4. [Verify Installation](#verify-installation)
5. [Install Required Dependencies](#install-required-dependencies)
6. [Configure Ansible](#configure-ansible)
7. [Test Ansible Setup](#test-ansible-setup)

---

## 🪟 Windows Installation

Ansible does not run natively on Windows. You need to use WSL2 (Windows Subsystem for Linux).

### Step 1: Install WSL2

```powershell
# Run as Administrator in PowerShell
wsl --install

# Restart your computer when prompted
```

### Step 2: Install Ubuntu on WSL2

```powershell
# After restart, install Ubuntu
wsl --install -d Ubuntu-22.04

# Launch Ubuntu and create username/password when prompted
```

### Step 3: Install Ansible in WSL2

```bash
# Open Ubuntu from Start Menu, then run:

# Update package list
sudo apt update && sudo apt upgrade -y

# Install prerequisites
sudo apt install software-properties-common python3-pip -y

# Add Ansible PPA
sudo add-apt-repository --yes --update ppa:ansible/ansible

# Install Ansible
sudo apt install ansible -y

# Verify installation
ansible --version
```

### Step 4: Install Python Dependencies

```bash
# Install required Python packages
pip3 install --upgrade pip
pip3 install kubernetes docker openshift PyYAML

# Install Ansible collections
ansible-galaxy collection install kubernetes.core
ansible-galaxy collection install community.docker
```

### Step 5: Configure WSL2 Access to Windows Files

```bash
# Your Windows files are accessible at /mnt/c/
cd /mnt/c/Users/YOUR_USERNAME/Desktop/hospital_management_system/ansible

# Create symlink for easier access (optional)
ln -s /mnt/c/Users/YOUR_USERNAME/Desktop/hospital_management_system ~/hospital-system
```

---

## 🐧 Linux Installation

### Ubuntu/Debian

```bash
# Update package list
sudo apt update && sudo apt upgrade -y

# Install prerequisites
sudo apt install software-properties-common python3-pip -y

# Add Ansible PPA
sudo add-apt-repository --yes --update ppa:ansible/ansible

# Install Ansible
sudo apt install ansible -y

# Verify
ansible --version
```

### RHEL/CentOS/Fedora

```bash
# Enable EPEL repository (RHEL/CentOS)
sudo yum install epel-release -y

# Install Ansible
sudo yum install ansible -y

# Or for Fedora
sudo dnf install ansible -y

# Verify
ansible --version
```

### Install Python Dependencies

```bash
# Install pip
sudo apt install python3-pip -y  # Ubuntu/Debian
sudo yum install python3-pip -y  # RHEL/CentOS

# Install required packages
pip3 install --upgrade pip
pip3 install kubernetes docker openshift PyYAML

# Install Ansible collections
ansible-galaxy collection install kubernetes.core
ansible-galaxy collection install community.docker
```

---

## 🍎 macOS Installation

### Using Homebrew (Recommended)

```bash
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Ansible
brew install ansible

# Verify
ansible --version
```

### Using pip

```bash
# Install Python 3 (if not installed)
brew install python3

# Install Ansible
pip3 install --upgrade pip
pip3 install ansible

# Verify
ansible --version
```

### Install Dependencies

```bash
# Install required Python packages
pip3 install kubernetes docker openshift PyYAML

# Install Ansible collections
ansible-galaxy collection install kubernetes.core
ansible-galaxy collection install community.docker
```

---

## ✅ Verify Installation

```bash
# Check Ansible version (should be 2.12+)
ansible --version

# Check Python version (should be 3.8+)
python3 --version

# Check installed collections
ansible-galaxy collection list

# Test Ansible
ansible localhost -m ping
```

**Expected output:**
```
localhost | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
```

---

## 📦 Install Required Dependencies

### Kubernetes Python Client

```bash
pip3 install kubernetes
```

### Docker Python SDK

```bash
pip3 install docker
```

### OpenShift Client

```bash
pip3 install openshift
```

### All at once

```bash
pip3 install kubernetes docker openshift PyYAML jmespath
```

### Ansible Collections

```bash
# Kubernetes collection
ansible-galaxy collection install kubernetes.core

# Docker collection
ansible-galaxy collection install community.docker

# General collection
ansible-galaxy collection install community.general

# Verify collections
ansible-galaxy collection list
```

---

## ⚙️ Configure Ansible

### Step 1: Set Up Project Structure

```bash
cd /path/to/hospital_management_system

# Verify ansible directory exists
ls -la ansible/

# You should see:
# - ansible.cfg
# - inventory.ini
# - group_vars/
# - *.yml (playbooks)
```

### Step 2: Update Configuration Files

**Edit `ansible/group_vars/all.yml`:**

```bash
cd ansible
nano group_vars/all.yml  # or use your preferred editor
```

Update these values:
```yaml
dockerhub_username: "your_dockerhub_username"
dockerhub_password: "your_dockerhub_password"  # Or use vault
```

**Edit `ansible/inventory.ini` (if deploying to remote hosts):**

```bash
nano inventory.ini
```

```ini
[local]
localhost ansible_connection=local

[kubernetes_cluster]
# Uncomment and update if using remote K8s cluster
# k8s-master ansible_host=YOUR_IP ansible_user=YOUR_USER
```

### Step 3: Set Up Ansible Vault (Optional - for secrets)

```bash
# Create vault password file
echo "your-vault-password" > ~/.ansible_vault_pass

# Encrypt sensitive file
ansible-vault encrypt group_vars/all.yml --vault-password-file ~/.ansible_vault_pass

# To edit encrypted file
ansible-vault edit group_vars/all.yml --vault-password-file ~/.ansible_vault_pass
```

### Step 4: Configure kubectl

```bash
# Verify kubectl is installed
kubectl version --client

# Check cluster connection
kubectl cluster-info

# If using Minikube
minikube start

# Verify
kubectl get nodes
```

### Step 5: Configure Docker

```bash
# Start Docker service (Linux)
sudo systemctl start docker
sudo systemctl enable docker

# Add user to docker group
sudo usermod -aG docker $USER

# Logout and login again, or run:
newgrp docker

# Test Docker
docker --version
docker ps
```

---

## 🧪 Test Ansible Setup

### Test 1: Ping localhost

```bash
ansible localhost -m ping
```

**Expected:** SUCCESS with "pong"

### Test 2: Check Ansible Configuration

```bash
cd ansible
ansible-config dump | grep DEFAULT
```

### Test 3: Test Playbook Syntax

```bash
cd ansible
ansible-playbook --syntax-check deploy-k8s.yml
```

### Test 4: Dry Run

```bash
ansible-playbook deploy-k8s.yml --check
```

### Test 5: Run Prerequisites Playbook

```bash
ansible-playbook setup-prerequisites.yml
```

### Test 6: Test Kubernetes Connection

```bash
# Create a test playbook
cat > test-k8s.yml << EOF
---
- name: Test Kubernetes Connection
  hosts: local
  gather_facts: no
  tasks:
    - name: Get cluster info
      kubernetes.core.k8s_cluster_info:
      register: cluster_info
    
    - name: Display cluster info
      debug:
        var: cluster_info
EOF

# Run test
ansible-playbook test-k8s.yml
```

### Test 7: Test Docker Connection

```bash
# Create test playbook
cat > test-docker.yml << EOF
---
- name: Test Docker Connection
  hosts: local
  gather_facts: no
  tasks:
    - name: Get Docker version
      docker_host_info:
      register: docker_info
    
    - name: Display Docker info
      debug:
        var: docker_info.host_info.ServerVersion
EOF

# Run test
ansible-playbook test-docker.yml
```

---

## 🔧 Troubleshooting

### Issue: "ansible: command not found"

**Solution:**
```bash
# Check if ansible is in PATH
which ansible

# Add to PATH (in ~/.bashrc or ~/.zshrc)
export PATH="$HOME/.local/bin:$PATH"
source ~/.bashrc
```

### Issue: "No module named 'kubernetes'"

**Solution:**
```bash
pip3 install kubernetes
# Or
python3 -m pip install kubernetes
```

### Issue: "Collection kubernetes.core not found"

**Solution:**
```bash
ansible-galaxy collection install kubernetes.core --force
```

### Issue: Permission denied when running playbooks

**Solution:**
```bash
# Don't use sudo with Ansible unless specifically needed
# Fix file permissions
chmod 644 ansible/*.yml
chmod 755 ansible/

# For Docker permission issues
sudo usermod -aG docker $USER
newgrp docker
```

### Issue: WSL2 can't access kubectl

**Solution:**
```bash
# Install kubectl in WSL2
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Copy kubeconfig from Windows
mkdir -p ~/.kube
cp /mnt/c/Users/YOUR_USERNAME/.kube/config ~/.kube/config
```

### Issue: "Failed to import docker or docker-py"

**Solution:**
```bash
pip3 uninstall docker docker-py
pip3 install docker
```

---

## 📚 Useful Ansible Commands

```bash
# Check version
ansible --version

# List inventory
ansible-inventory --list -i inventory.ini

# List collections
ansible-galaxy collection list

# Test connection to hosts
ansible all -m ping -i inventory.ini

# Run playbook with verbose output
ansible-playbook deploy-k8s.yml -vvv

# Run playbook with specific tags
ansible-playbook deploy-k8s.yml --tags "deploy-backend"

# Skip specific tasks
ansible-playbook deploy-k8s.yml --skip-tags "deploy-mysql"

# Check playbook syntax
ansible-playbook deploy-k8s.yml --syntax-check

# Dry run (check mode)
ansible-playbook deploy-k8s.yml --check

# Run with vault password
ansible-playbook deploy-k8s.yml --vault-password-file ~/.ansible_vault_pass
```

---

## 🎯 Next Steps

After successful installation:

1. **Update configuration:**
   ```bash
   cd ansible
   nano group_vars/all.yml
   # Update Docker Hub credentials
   ```

2. **Run deployment:**
   ```bash
   # Complete pipeline
   ansible-playbook main.yml
   
   # Or step by step
   ansible-playbook build-push-images.yml
   ansible-playbook deploy-k8s.yml
   ```

3. **Verify deployment:**
   ```bash
   kubectl get all -n hospital-system
   ```

---

## 📖 Additional Resources

- [Ansible Documentation](https://docs.ansible.com/)
- [Ansible for Kubernetes](https://docs.ansible.com/ansible/latest/collections/kubernetes/core/index.html)
- [Ansible Docker Module](https://docs.ansible.com/ansible/latest/collections/community/docker/index.html)
- [WSL2 Documentation](https://docs.microsoft.com/en-us/windows/wsl/)

---

**Installation complete!** You can now use Ansible to automate the deployment. See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for deployment instructions.
