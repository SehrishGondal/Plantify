from locust import HttpUser, task, between

class PlantifyUser(HttpUser):
    host = "http://localhost:8081"
    wait_time = between(1, 3)

    @task(3)
    def browse_plants(self):
        self.client.get("/", name="Home Page")

    @task(2)
    def search_plants(self):
        self.client.get("/search", name="Search")

    @task(2)
    def view_plant(self):
        self.client.get("/plant/1", name="Plant Detail")

    @task(1)
    def view_profile(self):
        self.client.get("/profile", name="User Profile")