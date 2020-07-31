layout: post
title: SQLAlchemy and Pandas
description: Use SQLAlchemy together with and Pandas
date: 2020-07-23
author: Jonas Colmsjo
tags: 'Python', 'Flask', 'webapp', 'SQLAlchemy', 'pandas'



config.py:

```
DATABASE_URI = 'mysql://invest:secret@localhost/invest'
```

invest_codegen:

This was generated from the database using sqlacodegen.

```
# coding: utf-8
from sqlalchemy import CHAR, Column, DECIMAL, DateTime, Index, String, Table, text
from sqlalchemy.dialects.mysql import INTEGER
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


class Portfolio(Base):
    __tablename__ = 'Portfolios'

    Portfolio = Column(CHAR(4), primary_key=True)
    GUID = Column(CHAR(36), nullable=False)


t_PricesForStocksToWatch = Table(
    'PricesForStocksToWatch', metadata,
    Column('Ticker', String(8), nullable=False, unique=True),
    Column('TimeStamp', DateTime, nullable=False),
    Column('High', DECIMAL(15, 2), nullable=False),
    Column('Low', DECIMAL(15, 2), nullable=False),
    Column('Open', DECIMAL(15, 2), nullable=False),
    Column('Close', DECIMAL(15, 2), nullable=False),
    Column('Volume', DECIMAL(15, 0), nullable=False)
)


t_StockOwnership = Table(
    'StockOwnership', metadata,
    Column('Portfolio', CHAR(4), nullable=False),
    Column('Ticker', String(8), nullable=False),
    Column('Period', INTEGER(6), nullable=False, comment="YYYYQQ, set QQ=00 for full year when if quarterly data isn't saved"),
    Column('NoShares', DECIMAL(15, 0), nullable=False),
    Column('EPS', DECIMAL(15, 2), nullable=False),
    Column('DPS', DECIMAL(15, 2), nullable=False),
    Column('Earnings', DECIMAL(15, 0), nullable=False, comment='EPS x NoShares'),
    Column('RetainedEarnings', DECIMAL(15, 0), nullable=False, comment='(EPS-DPS) x NoShares'),
    Column('Dividends', DECIMAL(15, 0), nullable=False, comment='DPS x NoShares'),
    Index('Ticker', 'Ticker', 'Portfolio', 'Period', unique=True)
)


t_StocksToWatch = Table(
    'StocksToWatch', metadata,
    Column('Ticker', String(8), nullable=False),
    Column('Instrument', INTEGER(11), nullable=False),
    Column('Action', CHAR(1), nullable=False, comment='(B)uy, (S)ell'),
    Column('Price', DECIMAL(15, 0), nullable=False),
    Column('Currency', CHAR(3), nullable=False),
    Column('LastUpdate', DateTime, nullable=False),
    Index('Ticker', 'Ticker', 'Action', 'Price', 'Currency', unique=True)
)


class TickerDatum(Base):
    __tablename__ = 'TickerData'

    Ticker = Column(String(8), primary_key=True, nullable=False, server_default=text("''"))
    TS_Name = Column(String(100), primary_key=True, nullable=False, server_default=text("''"))
    TS_Type = Column(CHAR(1), primary_key=True, nullable=False)
    TS_Index = Column(String(10), primary_key=True, nullable=False, server_default=text("''"))
    Value = Column(DECIMAL(15, 4))
    Note = Column(String(255))


class Transaction(Base):
    __tablename__ = 'Transactions'

    TransID = Column(INTEGER(11), primary_key=True)
    TransDate = Column(DateTime, nullable=False)
    Portfolio = Column(CHAR(4))
    Ticker = Column(String(20))
    ShareType = Column(CHAR(1), comment='(S)Share, (B)ond')
    TransType = Column(CHAR(1), nullable=False, comment='(B)uy, (S)ell, (D)ividend, (W)ithdraw, d(E)posit, s(P)lit, (I)inlösen')
    NoShares = Column(DECIMAL(15, 5))
    PerShare = Column(DECIMAL(15, 2))
    Amount = Column(DECIMAL(15, 2), nullable=False, comment='should equal NoShares x PerShare x sign')
    Courtage = Column(DECIMAL(15, 2), nullable=False)
    TransAmount = Column(DECIMAL(15, 2), nullable=False, comment='should equal Amount + Courtage')
    Currency = Column(CHAR(3), nullable=False)
    Depo = Column(String(20))
    Note = Column(String(255))
```

invest.py

```
# coding: utf-8
#
# 2020-07-25, Jonas Colmsjö
#
# http://google.github.io/styleguide/pyguide.html
#
# conda install -c auto colanderalchemy

from sqlalchemy import CHAR, Column, DECIMAL, DateTime, Index, String, Table, text
from sqlalchemy.dialects.mysql import INTEGER
from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, mapper

import pandas as pd

from config import DATABASE_URI


Base = declarative_base()
metadata = Base.metadata


class Portfolio(Base):
    __tablename__ = 'Portfolios'

    Portfolio = Column(CHAR(4), primary_key=True)
    GUID = Column(CHAR(36), nullable=False)

    def get_df(session):
        q = session.query(Portfolio)
        return pd.read_sql(q.statement, q.session.bind)

class TickerDatum(Base):
    __tablename__ = 'TickerData'

    Ticker = Column(String(8), primary_key=True, nullable=False, server_default=text("''"))
    TS_Name = Column(String(100), primary_key=True, nullable=False, server_default=text("''"))
    TS_Type = Column(CHAR(1), primary_key=True, nullable=False)
    TS_Index = Column(String(10), primary_key=True, nullable=False, server_default=text("''"))
    Value = Column(DECIMAL(15, 4))
    Note = Column(String(255))

    def get_df(session):
        q = session.query(TickerDatum)
        return pd.read_sql(q.statement, q.session.bind)


class Transaction(Base):
    __tablename__ = 'Transactions'

    TransID = Column(INTEGER(11), primary_key=True)
    TransDate = Column(DateTime, nullable=False)
    Portfolio = Column(CHAR(4))
    Ticker = Column(String(20))
    ShareType = Column(CHAR(1), comment='(S)Share, (B)ond')
    TransType = Column(CHAR(1), nullable=False, comment='(B)uy, (S)ell, (D)ividend, (W)ithdraw, d(E)posit, s(P)lit, (I)inlösen')
    NoShares = Column(DECIMAL(15, 5))
    PerShare = Column(DECIMAL(15, 2))
    Amount = Column(DECIMAL(15, 2), nullable=False, comment='should equal NoShares x PerShare x sign')
    Courtage = Column(DECIMAL(15, 2), nullable=False)
    TransAmount = Column(DECIMAL(15, 2), nullable=False, comment='should equal Amount + Courtage')
    Currency = Column(CHAR(3), nullable=False)
    Depo = Column(String(20))
    Note = Column(String(255))

    def get_df(session):
        q = session.query(Transaction)
        return pd.read_sql(q.statement, q.session.bind)


# codegen don't generate a class for this table since it doesn't have a primary key
t_StockOwnership = Table(
    'StockOwnership', metadata,
    Column('Portfolio', CHAR(4), nullable=False),
    Column('Ticker', String(8), nullable=False),
    Column('Period', INTEGER(6), nullable=False, comment="YYYYQQ, set QQ=00 for full year when if quarterly data isn't saved"),
    Column('NoShares', DECIMAL(15, 0), nullable=False),
    Column('EPS', DECIMAL(15, 2), nullable=False),
    Column('DPS', DECIMAL(15, 2), nullable=False),
    Column('Earnings', DECIMAL(15, 0), nullable=False, comment='EPS x NoShares'),
    Column('RetainedEarnings', DECIMAL(15, 0), nullable=False, comment='(EPS-DPS) x NoShares'),
    Column('Dividends', DECIMAL(15, 0), nullable=False, comment='DPS x NoShares'),
    Index('Ticker', 'Ticker', 'Portfolio', 'Period', unique=True)
)

def get_stock_ownership_df(session):
    q = session.query(t_StockOwnership)
    return pd.read_sql(q.statement, q.session.bind)



engine = create_engine(DATABASE_URI)
session = sessionmaker()
session.configure(bind=engine)
s = session()

print(Portfolio.get_df(s))
print(get_stock_ownership_df(s))
print(Transaction.get_df(s))
```


Run the app:

```
python invest.py
```

# Resources

* [Generate SQLA Models](https://pypi.org/project/sqlacodegen/)
