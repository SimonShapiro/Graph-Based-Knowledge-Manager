"use strict";
 
const run = (fn, initialState, maxTick) => {
                let stateLog = {};
                let tick = 1;
                let state = initialState;
                stateLog[0] = state;
                while (tick <= maxTick) {
                                state = fn(state, stateLog, tick)
                                stateLog[tick] = state
                                tick++
                }
                return stateLog
}
 
const lag = (history, n) => {
                let l = Object.keys(history).length
                if ((l - n) < 0) return history[0]
                else return history[l - n]
}
 
const initialState = {
                static: {
                                loanGrowth: .60,
                                repayment: .30,
                                nonPerforming: 0.15,
                                capRatio: .10,
                                retailFunding: .70,
                                retailNsfrDepo: 0.9,
                                retailNsfrLoan: .5
                },
                loans: 0.5e6,
                loanRate: 2.5/12,
                capital: 2e6,
                liquids: 0,
                liquidsRate: .01/12,
                cash: 0.5e6,
                depo1: 0,
                depo1Rate: .01/12,
                depo2: 0,
                depo2Rate: .05/12,
                regRatios: {
                                capital: 0,
                                lcr: 0,
                                nsfr: 0
                }
}
 
const model = (state, history, time) => {
                let s = JSON.parse(JSON.stringify(state))
                let netGrowth = (state.static.loanGrowth - state.static.repayment)
                let cashIn = s.loans * state.static.repayment
                let cashOut = s.loans * state.static.loanGrowth
                s.netCash = cashIn - cashOut
                s.cash = s.cash + s.netCash
                let depo1Delta = (s.cash < 0) ? -s.cash * state.static.retailFunding : 0
                let depo2Delta = (s.cash < 0) ? -s.cash * (1 - state.static.retailFunding) + depo1Delta : 0
                s.depo1 = s.depo1 + depo1Delta
                s.depo2 = s.depo2 + depo2Delta
                /*
                shorfall = 100
                depo1 = 70
                depo2 = 30 + 70
                liquids = 70
                */
                s.cash = s.cash  + depo2Delta // s.depo1 goes to liquids !!
                s.loans = s.loans * (1 + netGrowth)
                s.liquids = s.liquids + depo1Delta
                s.capitalRequired = (s.loans + lag(history, 1).loans)/2 * state.static.capRatio
                s.regRatios.capital = s.capital / s.loans * 100 // assume 100% RWA
                s.regRatios.lcr = s.liquids / s.depo1
                s.regRatios.nsfr = (s.capital + s.depo1 * state.static.retailNsfrDepo) / (s.loans * state.static.retailNsfrLoan)   // just guessing
 
                s.totalAssets = s.loans + s.liquids + s.cash
                s.totalLiabilities = s.capital + s.depo1 + s.depo2
                let lastPeriod = lag(history, 1)
                s.loanIncome = (s.loans + lastPeriod.loans) / 2 * s.loanRate * (1 - state.static.nonPerforming)
                s.nonPerforming = (s.loans + lastPeriod.loans) / 2 * state.static.nonPerforming
                s.liquidsIncome = (s.liquids + lastPeriod.liquids) / 2 * s.liquidsRate
                s.totalIncome = s.loanIncome + s.liquidsIncome
                s.depo1Expense = (s.depo1 + lastPeriod.depo1) / 2 * s.depo1Rate
                s.depo2Expense = (s.depo2 + lastPeriod.depo2) / 2 * s.depo1Rate
                s.totalExpense = s.depo1Expense + s. depo2Expense
                s.netIncome = s.totalIncome - s.totalExpense
//            console.log(stateLog)
                return s
}
 
let l = run(model, initialState, 12)
console.log(l)