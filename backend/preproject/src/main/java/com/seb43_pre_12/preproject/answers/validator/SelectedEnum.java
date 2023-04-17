package com.seb43_pre_12.preproject.answers.validator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {SelectedEnumValidator.class})
public @interface SelectedEnum {
    String regexp();
    String message() default "입력 가능한 값은 ANSWER_SELECTED 와 ANSWER_NOT_SELECTED 만 가능합니다."; // (2)
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
