package com.woori_silok;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class SpringbootBasicApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringbootBasicApplication.class, args);
    }
}
