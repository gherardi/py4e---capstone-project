# Simple Python Search Spider, Page Ranker, and Visualizer

This project is a Python-based simulation of key functions found in a search engine, including web crawling, page ranking, and data visualization. The project stores its data in an SQLite3 database named `spider.sqlite`. You can delete this file at any time to restart the crawling process.

## Prerequisites

- **SQLite Browser**: You may want to install an SQLite browser to view and modify the database conveniently.
  - Download from: [http://sqlitebrowser.org/](http://sqlitebrowser.org/)
- **Python 3.x**: Ensure Python 3.x is installed on your system.

## Overview

### 1. Web Crawling (Spider)
The program `spider.py` crawls web pages, starting from a given URL, and records the links between pages into an SQLite database. Each run is additive; it won't re-crawl pages already in the database. This allows for incremental exploration of a website.

#### Example Usage
On **Mac**:
```bash
$ rm spider.sqlite
$ python3 spider.py
```

On **Windows**:
```bash
> del spider.sqlite
> spider.py
```

You will be prompted for a starting URL and the number of pages to crawl:
```plaintext
Enter web url or enter: http://www.example.com/
How many pages: 2
```

In this example, two pages from the site will be retrieved and stored. Subsequent runs will randomly crawl additional pages not yet stored.

### 2. Viewing the Database
To inspect the contents of the database, you can use the `spdump.py` script, which shows pages and their relationships:

```bash
$ python3 spdump.py
```

The output will show the page ID, URL, and page rank (if calculated).

### 3. Page Ranking
The `sprank.py` script computes PageRank scores for the crawled pages. The more times you run it, the more refined the PageRank will become.

#### Example Usage
On **Mac**:
```bash
$ python3 sprank.py
```

On **Windows**:
```bash
> sprank.py
```

You'll be prompted for the number of iterations:
```plaintext
How many iterations: 2
```

After the iterations, you can dump the database again to see the updated PageRank values.

### 4. Resetting Page Rank
If you want to reset all PageRank values without affecting the crawled data, use the `spreset.py` script:

```bash
$ python3 spreset.py
```

This resets all pages to a rank of 1.0.

### 5. Visualizing the Data
To visualize the page links and rankings, run `spjson.py`, which outputs the data in JSON format for a browser-based visualization.

```bash
$ python3 spjson.py
```

This creates a `spider.js` file. You can view the data by opening `force.html` in a browser. The visualization allows for interactive exploration of the web of crawled pages.

The visualization uses D3.js, a JavaScript library for data-driven documents:
- [D3.js Force Layout](https://github.com/mbostock/d3/wiki/Force-Layout)

## Notes for Windows Users
If you encounter issues displaying UTF-8 characters in the command line, you may need to set the console's code page to UTF-8 by typing the following command before running the scripts:
```bash
chcp 65001
```
More details: [StackOverflow - Unicode in Windows Command Line](http://stackoverflow.com/questions/388490/unicode-characters-in-windows-command-line-how)
