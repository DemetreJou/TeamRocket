# Project Milestones

## High-level overview and milestones

### 1st Milestone

- **Documentation:** The first step of the project is documentation.
We want to make sure that every decision is well documented, so that we can come back
later to a shared environment of recorded history. This makes it efficient to keep
track of our project’s main focus, while also keeping record of important details that
we might forget later down the line. Documentation includes goal-oriented
meeting notes, road-mapping, learning-oriented tech-stack and high-level milestones.
Although it is a process that we will repeat in every milestone, the first one
will define the overall foundation of our project

- **Similar Tools:** The next step would be to undergo some preliminary research.
Since our domain consists of distributed logging and monitoring, there are a lot of
industry standard tools used in today’s world that we can use as a blueprint. Creating
a basic prototype from some specific tools like ElasticSearch would guide us in our
first steps. Therefore, we should do some research and understand how present
architectures in this domain work before embarking on our own. Configuration and
deployment. After we have decided on very basic details, we can get started on
configuring and deploying a dummy application using our tech stack.
This application would help set in stone the foundation to our code and enable us
to conjointly work on it through Github.

- **CI/CD:** We also have to define our CI/CD workflow so that the code that
we are going to all be eventually working on is decoupled from one another to
ensure there is a faster merging process and we allocate less time for errors.
CI/CD using GitHub Actions offers workflows that can build the code in your
repository and run your tests on a set schedule to ensure preliminary checking
before a team member reviews a PR.

- **Assignment of Tasks:** Assigning tasks earlier on ensures a faster workflow and directed division of responsibility.

#### 2nd Milestone

- **Backend Implementation:** Create a “dummy” web application in which we implement a simple logging system.
  **Understand and experiment with log messages:** correlation id, context id, etc.
  This logging system would allow one machine to log multiple inputs from various servers.
  Begin with a single endpoint that reads and writes to our PSQL database from our logging system.
  Have a simple “dummy” page on the web browser that presents relevant information (that we will build on top of in later milestones).

**3rd Milestone**

- **Multiple Machines Logging:** We want to be able to log any amount of servers in a centralized location so that we can add more microservices to what is being logged.

- **Monitoring Checks:** Analyze our current architecture and use pre-configured rules to check the system’s activity and correctness in terms of usability and scalability.
Make improvements and/or changes as required to build a solid foundation for
the backend system.

- **Shard Database:** At this stage, we want to make improvements to our database. Through horizontal partitioning, we can facilitate horizontal scaling. This allows us to spread out the overall traffic load and allow for faster processing.

##### 4th Milestone

- **Data Visualization:** Once we have the backend working as we intended, we could go as far to implement a visualization tool on the frontend. This visualization would allow for easier navigation of our logging and monitoring system.

- **“Leader-follower” Database Architecture:** Additional tweaks we can add to our database would be to implement a “leader-follower” database architecture to help stabilize the system.

- **Kafka Queue:** We want to improve our overall system peak load hardening through implementing a kafka queue architecture.

For each of our milestones, we will conduct a thorough checking to ensure we have reached the agreed-upon goals. We will conduct a variety of user testing, manual testing, as well as integration testing to ensure the agreed-upon goals have been reached and that they work well within the existing system. We will ask team members who did not work on a specific feature to conduct testing for that feature.