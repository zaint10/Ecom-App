import environ

# Initialize environment
env = environ.Env()

# Accessing from .env file
env_file = '.env'
env.read_env(env_file)