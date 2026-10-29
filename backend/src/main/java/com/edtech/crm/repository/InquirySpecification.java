package com.edtech.crm.repository;

import com.edtech.crm.entity.Category;
import com.edtech.crm.entity.Inquiry;
import com.edtech.crm.entity.UserType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class InquirySpecification {

    public static Specification<Inquiry> filterBy(Category category, UserType userType, String search) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (category != null) {
                predicates.add(cb.equal(root.get("category"), category));
            }

            if (userType != null) {
                predicates.add(cb.equal(root.get("userType"), userType));
            }

            if (search != null && !search.trim().isEmpty()) {
                String pattern = "%" + search.trim().toLowerCase() + "%";
                Predicate nameMatch = cb.like(cb.lower(root.get("name")), pattern);
                Predicate phoneMatch = cb.like(root.get("phone"), "%" + search.trim() + "%");
                predicates.add(cb.or(nameMatch, phoneMatch));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
