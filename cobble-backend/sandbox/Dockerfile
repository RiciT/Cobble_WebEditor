# cobble-backend/sandbox/Dockerfile
FROM debian:stable-slim

# Install whatever dependencies your compiler needs
RUN apt-get update && apt-get install -y \
  nasm \
  build-essential \
  gcc g++ make \
  && rm -rf /var/lib/apt/lists/*

# Copy compiler binary into the image
COPY ./Cobble_Compiler/cmake-build-debug/cobble /usr/local/bin/cobble
RUN chmod +x /usr/local/bin/cobble

# Create work directory
WORKDIR /sandbox

# Default command — can be overridden at runtime
CMD ["/bin/bash"]

#docker build -t cobble-sandbox -f Cobble_WebEditor/cobble-backend/sandbox/Dockerfile run this in Cobble_language to rebuild the docker