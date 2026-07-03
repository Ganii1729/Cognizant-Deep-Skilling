package com.cognizant.ormlearn.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cognizant.ormlearn.model.Stock;
import com.cognizant.ormlearn.repository.StockRepository;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    @Transactional
    public List<Stock> getFacebookStocksForSeptember2019() {

        return stockRepository.findByCodeAndDateBetween(
                "FB",
                LocalDate.of(2019, 9, 1),
                LocalDate.of(2019, 9, 30));
    }

    @Transactional
    public List<Stock> getGoogleStocksWithCloseGreaterThan(BigDecimal price) {

        return stockRepository.findByCodeAndCloseGreaterThan(
                "GOOGL",
                price);
    }

    @Transactional
    public List<Stock> getTop3ByVolume() {
        return stockRepository.findTop3ByOrderByVolumeDesc();
    }

    @Transactional
    public List<Stock> getLowestNetflixStocks() {
        return stockRepository.findTop3ByCodeOrderByCloseAsc("NFLX");
    }
}
