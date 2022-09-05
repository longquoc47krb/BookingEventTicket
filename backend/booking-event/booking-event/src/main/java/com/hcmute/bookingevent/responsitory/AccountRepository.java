package com.hcmute.bookingevent.responsitory;

import com.hcmute.bookingevent.models.Account;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AccountRepository extends MongoRepository<Account,String> {
}
