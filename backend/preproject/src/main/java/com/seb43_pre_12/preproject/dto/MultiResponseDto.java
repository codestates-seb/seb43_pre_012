package com.seb43_pre_12.preproject.dto;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class MultiResponseDto<T> {
    private List<T> date;
    private PageInfo pageInfo;

    public MultiResponseDto(List<T> date, Page page) {
        this.date = date;
        this.pageInfo = new PageInfo(page.getNumber()+1,
                page.getSize(), page.getTotalElements(), page.getTotalPages());
    }
}
