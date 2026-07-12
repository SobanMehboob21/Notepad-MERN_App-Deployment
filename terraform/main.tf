variable "region" {
  description = "value of region"
  type        = string
  default     = "us-east-1"
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "6.54.0"
    }
  }
}

provider "aws" {
  region = var.region
}

resource "aws_security_group" "notepad_mern_sg" {
  name        = "notepad_mern_sg"
  description = "Allow inbound MERN cluster traffic"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5173
    to_port     = 5173
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
  from_port   = 3000
  to_port     = 3000
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
}

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "notepad_mern_sg"
  }
}

resource "aws_instance" "notepad_aws_instance" {
  ami                    = "ami-053b0d53c279acc90"
  instance_type          = "t3.micro"
  vpc_security_group_ids = [aws_security_group.notepad_mern_sg.id]
  key_name               = "notepad__keypair"

  tags = {
    Name = "My new instance"
  }
}

output "public_ip" {
  value = aws_instance.notepad_aws_instance.public_ip
}