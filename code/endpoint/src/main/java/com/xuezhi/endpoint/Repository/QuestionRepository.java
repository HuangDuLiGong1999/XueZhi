package com.xuezhi.endpoint.Repository;

import com.xuezhi.endpoint.Entity.Question;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuestionRepository extends MongoRepository<Question, String> {
    public Question findOneById(String id);
}
