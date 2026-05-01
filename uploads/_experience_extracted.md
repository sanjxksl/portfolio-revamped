
## [Heading3] WORK
CIBC, Toronto, Canada
Role: AI Solutions | ML Solution | Data Science | Data Analysis
Team: Global Methodology Programs &amp; Strategy, January 2026 – Present
Designed an AI-driven exam-scoping assistant to help CEEP examiners conduct enterprise-level AML and Compliance exams faster, expand coverage, close scoping gaps, and consistently produce high-quality exam scopes.
Spent 2 weeks embedded with the team, conducting interviews and ethnographic observation to understand examination scoping end-to-end and prioritise pain points in a highly complex, fast-paced, high-stakes environment with confidential, vast, unstructured data scattered across multiple repositories.
Decided to build a proactive AI Agent that also serves as a centralised repository and smart search engine, reducing days of manual effort to understand previous scopes, identify gaps, and locate the right document versions to a near-instant, search-based workflow.
Enabled examiners to retrieve, from just a line of business or tentative scope element, the most relevant documents ranked by relevance, along with templates, prior issues, risk ratings, and emerging insights driven by relevant news and recent changes.
Added an inline chatbot to answer document-specific questions directly within the interface so examiners no longer need to manually search for the right sections or sentences in huge reports.
Built the solution by ingesting historical exam reports and implementing RAG on the final reports, with a roadmap to integrate APIs to documentary repositories via Databricks for automated data ingestion, connect an LLM API for NLP and natural-language insights, and incorporate a second LLM trained on domain news to provide a proactive insight layer.
Managed version control using GitHub to maintain traceability and collaboration across model, data, and UI changes.
Designed the final UI deployed in Streamlit, creating an intuitive, examiner-friendly interface that allows easy configuration and adjustment of search and insight parameters.
Performed manual quality checks to validate data-extraction accuracy in the absence of a baseline, and defined a future evaluation framework using simulated, real-life-inspired case scenarios that can be automated for continuous, iterative quality improvement.

## [Heading3] PROJECTS
Executive Compensation Anomaly Detection
Domain: Financial Analytics, SQL, Data Visualisation, Risk Scoring
Year: 2026
GitHub: https://github.com/sanjxksl/executive-compensation-anomaly
Built an end-to-end anomaly detection system on Compustat WRDS data covering 30 years of executive compensation across North American public companies, motivated by a real forensic finance question: are executives being paid anomalously relative to their industry peers, and does company performance justify it.
Designed a modular SQL architecture using views to avoid repeated subquery joins - computed industry-level baselines via a self-join, flagged anomalies using z-score thresholds, and joined across three tables (Execucomp, Fundamentals Annual, Total Q) to layer in revenue, net income, EBITDA, and Tobin's Q for each flagged executive.
Built a composite risk metric grounded in the Expected Loss framework from actuarial risk scoring - anomaly rate multiplied by average severity - to normalise for industry scale and avoid the misleading conclusion that large sectors like Regional Banks are structurally worse than smaller ones like Restaurants.
Found that industries with the highest raw anomaly counts were not the most structurally problematic once normalised - Forest Products, Brewers, and Industrial Gases had the highest composite scores, while Systems Software and Industrial REITs had the most extreme individual anomalies despite lower frequency.
Identified a counterintuitive trend: anomaly count grew steadily from 1992 to 2008 but average severity declined over the same period, suggesting governance reforms moderated the degree of excess even as the number of anomalous pay packages increased.
Visualised findings in a four-chart Tableau dashboard and published the full SQL codebase to GitHub.
Post-Earnings Announcement Drift (PEAD) — Empirical Asset Pricing Replication
Domain: Empirical Finance, Asset Pricing, Statistical Modelling, WRDS
Year: 2026
GitHub: https://github.com/sanjxksl/PEAD.git
Replicated Ball and Brown (1968) on CRSP and Compustat data over 2000 to 2023, constructing Standardised Unexpected Earnings using an eight-quarter rolling volatility window and assigning SUE deciles from prior-quarter breakpoints to prevent lookahead bias.
Linked CRSP and Compustat via the CCM table, computed size-adjusted abnormal returns using Fama-French NYSE breakpoints, and built an event-time return panel to examine cumulative abnormal returns across a 12-month post-announcement window.
Cross-sectional regressions with HC1 standard errors confirmed PEAD concentrates in small firms, consistent with Shleifer-Vishny limits-to-arbitrage. Trend analysis found modest secular attenuation in the spread, consistent with algorithmic trading accelerating price discovery over the sample period.
ESG Performance and Financial Returns
Domain: Empirical Finance, ESG Analytics, Regression Analysis, WRDS
Year: 2026
GitHub: https://github.com/sanjxksl/esg-returns-study
Co-authored a study on 20,764 firm-year observations across 3,351 US firms from 2013 to 2023 using LSEG Refinitiv ESG scores, Compustat, and CRSP; led Part II on the determinants of ESG performance.
Ran four OLS models with firm-level controls and Fama-French 48 industry fixed effects — found that the positive leverage-ESG association collapsed entirely once industry composition was controlled for, and that R&amp;D intensity reversed sign within industries relative to the unconditional estimate.
Central finding: ESG predicts next-year ROA positively and significantly after controls, but the return signal disappears once earnings news enters the model, suggesting the market prices ESG through fundamentals rather than as a standalone factor.
Credit Risk Prediction with Counterfactual Explanations
Domain: Financial ML, Data Science, Feature Engineering, Explainable AI, MLOps, SageMaker, Docker, AWS S3
Year: 2025
GitHub: https://github.com/sanjxksl/credit-risk-counterfactual
Built an end-to-end credit risk classification system on 148,670 mortgage applications, training an MLP and XGBoost model achieving AUC-ROC of 0.901 and calibration gap under 0.3% using Platt scaling - distinguishing between its legitimate use correcting loss reweighting bias from pos_weight and its illegitimate use as a post-hoc fix for SMOTE-induced distribution shift
Conducted a systematic categorical feature audit identifying data artifacts - caught that the high predictive power of credit_type was driven by the EQUI bureau category exhibiting a 100% default rate across 15,000 cases, indicating an unobserved loan program rather than genuine borrower risk, preventing a model that would fail to generalize to new originator programs; removed 5 such artifact features before modelling
Generated DiCE counterfactual explanations for declined applications identifying minimum loan structure changes to flip a predicted default; interpreted counterfactual generation failures as meaningful signal - cases where no feasible restructuring exists indicate risk driven by immutable borrower characteristics rather than adjustable loan terms
Evaluated model fairness across gender, age, and geographic subgroups; computed disparate impact ratio of 1.021 confirming the model passes the 80% rule with calibration gaps under 1.2% across all demographic groups
Engineered an inference pipeline that exactly replicates the training preprocessing chain - including log transforms applied before standardization, winsorization, and one-hot encoding - preventing training-serving skew at deployment
Deployed the model as a FastAPI REST endpoint on AWS SageMaker using a custom Docker container with separate fast prediction and explainability routes, returning calibrated default probabilities and actionable counterfactual recommendations
Built a monitoring layer using Evidently to detect data drift between live traffic and the training distribution, with retraining triggers defined on feature drift share exceeding 30% or predicted default rate shifting more than 5 percentage points from the training baseline
US Census Income Prediction
Domain: Deep Learning, Neural Network, Classification
Year: 2025
GitHub: https://github.com/sanjxksl/us-income-prediction
Classify whether someone earns above $50K from demographic and employment data. Solves the challenge of building a reliable neural network on imbalanced tabular data where naive approaches fail badly.
Binary income classification (above/below $50K annually) on the US Census dataset; 75% / 25% class split; 90 features after preprocessing.
Preprocessing pipeline: median imputation for numeric features; most-frequent imputation for categorical features; MinMaxScaler normalization (preferred over StandardScaler after observing 2% accuracy gain); one-hot encoding of categorical variables via ColumnTransformer.
Feature engineering: created gain_loss_ratio = (capital-gain + 1) / (capital-loss + 1) and total_capital = capital-gain - capital-loss; empirically validated that adding more than 2 engineered features decreased performance.
Designed a 2-hidden-layer neural network ([256, 128] units) with ReLU activations, BatchNorm, and Dropout (0.3); used Adam optimizer (lr = 0.001); found that deeper architectures (4+ layers: [512, 256, 128, 64]) degraded accuracy to 82-83% due to noise amplification on tabular data.
Training strategy: 5-fold stratified cross-validation ensemble; trained one model per fold; averaged predicted probabilities across all 5 models for final predictions; applied class weight of 1.2x for the minority high-earner class.
Callbacks: EarlyStopping (patience = 15), ReduceLROnPlateau; batch size 64, max 100 epochs.
Optimized classification threshold from 0.5 to 0.70 to reduce false positives; threshold sweep tested over 0.30-0.70 range.
Test results: 85.62% accuracy, 0.9094 AUC-ROC, 0.6980 F1-score; 92% accuracy on low-earner class, 67% recall on high-earner class; competitive with XGBoost (86-87%) while demonstrating neural network applicability to tabular income data.
Alumni Career Success Prediction
Domain: Data Science, Predictive Analytics
Year: 2025
GitHub: https://github.com/sanjxksl/alumni-career-success
Predict salary and career outcomes for alumni given their role and location. Solves the institutional problem of scattered, inconsistent alumni data that cannot be used for curriculum decisions or outcome reporting.
Merged four fragmented alumni CSV datasets from IIITDM with heterogeneous salary formats (USD, INR, lakhs per annum, monthly figures); built a data preparation pipeline to standardize, convert, and unify records into a single analysis-ready dataset.
Cleaned and engineered features: unified designation and country-of-employment columns; applied log transformation to salary; one-hot encoding for categorical features; StandardScaler normalization.
Trained a Random Forest Regressor for salary prediction; hyperparameter tuning via GridSearchCV with 5-fold cross-validation; evaluated using MAE and R-squared.
Trained a Random Forest Classifier for binary career success classification (above/below median salary threshold); applied balanced class weights; evaluated using accuracy, ROC-AUC, confusion matrix, and precision-recall metrics.
Built an interactive command-line prediction interface allowing salary and career success prediction for arbitrary designation and country inputs.
Aesthify
Domain: Computer Vision, Product Design, Design Research
Year: 2025
GitHub: https://github.com/sanjxksl/Aesthify
Quantify visual design principles from interior layout images and compare them against what people actually prefer. Solves the lack of any systematic, measurable framework for understanding how aesthetics are perceived differently across cultures and demographics.
This moves a Designer-centric design to a more User-centric design. Rooted in the fact that design aesthetics is extremely subjective and can never be fitted into one regression line or a formula.
Built a modular Flask web application to quantify visual design principles in interior layout images and compare computed scores against human perception data from a 100-participant user study.
Computer vision pipeline: integrated YOLOv8 object detection and Roboflow API to identify objects in interior images; computed rule-based scores for 7 design principles: balance, proportion, symmetry, simplicity, harmony, contrast, and unity.
User study and analysis: collected aesthetic ratings from 101 participants; ran correlation analysis between computed design scores and user ratings; performed demographic clustering to identify perception patterns by geography and background.
Key findings: simplicity correlated most strongly with user preference (r = 0.68); symmetry negatively correlated (r = -0.60) indicating users preferred asymmetric layouts; aesthetic judgment varied significantly across demographic groups.
Tech stack: Python 3.10, Flask, OpenCV, YOLOv8, Roboflow, Pandas, Scikit-learn, Matplotlib, Seaborn, OpenPyXL; results exported to Excel for survey analysis.
Evidence Engine
Domain: AI Tooling, Product Management, Prioritization
Year: 2025
GitHub: https://github.com/sanjxksl/evidence-engine
Help product managers synthesize messy research into structured, defensible insights. Solves the fact that prioritization frameworks like RICE get gamed by bias because the inputs (evidence) are never rigorously gathered or challenged before scoring begins.
Built a conversational AI tool in Streamlit using Google Gemini API to help product managers extract structured evidence from raw research inputs (user interviews, feedback, analytics) and test hypotheses systematically.
Modular architecture: evidence extractor, synthesizer, intent classifier, output generator, transparent reasoning tracer, and SQLite persistence layer.
Implemented LLM-based intent classification to route queries across modes: hypothesis testing, pattern identification, confidence assessment, stakeholder reporting, and assumption validation.
Transparent reasoning traces expose supporting and counter-evidence for every verdict, classifying evidence into six types: user quotes, behavioral observations, support tickets, analytics data, stakeholder input, and competitor intelligence.
Research foundation: designed to address cognitive biases (HiPPO bias, confirmation bias, anchoring) identified in a literature review of Kahneman-Tversky and Morewedge et al.; validated problem through interviews with practicing PMs.
Deployed on Streamlit Cloud; prompt templates modularized in a separate prompts directory for extensibility.

## [Heading3] CASE COMPETITIONS
Koru Problem Hunt
Domain: Problem Discovery &amp; Identification, User Interviews, User Surveys, Prototyping, User Personas &amp; Journey, Product Strategy, Consumer Tech
Year: Nov 2025
Short Version:
Conducted mixed-methods primary research across hobbyists and studio owners: designed a quantitative survey (79% aged 18-24) and 8 in-depth qualitative user interviews to identify the core barriers to hobby participation.
Synthesised survey data to quantify a "friction trinity": cost (82%), schedule fit (84%), and discovery (90%) as the three statistically dominant barriers; quantified studio-side losses at 51% average underutilisation and $300 lost revenue per empty class.
Segmented the hobbyist market into two behavioural profiles (Explorers and Connectors) using interview data, recommended Connectors as the initial target segment based on retention potential, and mapped a dual-sided 6-stage user journey for both hobbyists and studio owners.
Sized the North American hobby market (TAM $45B+, SAM $3.6B, SOM $9-15M) and conducted competitive landscape analysis against 8 players, identifying a white space opportunity no competitor occupied.
Designed ThirdPlace, a dual-sided social marketplace with a credit-based subscription model, and built a hypothesis register across desirability, feasibility, and viability with specific experiment designs for each assumption.
Elaborate Version:
Research and Data Collection
Designed and executed a mixed-methods research study combining a quantitative survey (79% aged 18-24, equal gender split, 71% with prior hobby class experience) and 8 in-depth 30-minute qualitative user interviews across both hobbyists and studio owners
Identified three statistically dominant barriers to hobby participation — cost (82%), schedule fit (84%), discovery (90%) — which the team named the "friction trinity"; used this to anchor all product decisions in evidence rather than assumption
Quantified studio-side losses: 51% average underutilisation across hobby studios, $300 average lost revenue per unfilled 10-person ceramics class, 40-60% empty capacity industry-wide
Synthesised qualitative themes from studio owner interviews into two categories: opportunities (new member acquisition, booking automation, revenue predictability) and critical concerns (commission structure, trial conversion, system integration, demographic fit)
Analysis and Synthesis
Built two research-backed user personas grounded in interview data: Samira (hobbyist, social connector, 28, Toronto) and Jenn (studio owner, Loft Pottery, capacity and revenue focused)
Mapped a dual-sided 6-stage user journey (Discovery, Evaluation, Booking, First Experience, Progression, Ongoing Engagement) identifying friction points for both user types at each stage
Built detailed journey maps for both hobbyists (Appendix 3) and studio owners (Appendix 4) including user actions, thoughts, pain points, emotional arc, and product opportunities at each stage
Segmented the hobbyist market into two distinct behavioural profiles: Explorers (variety seekers, top barrier = schedule fit, top feature = progress tracking) and Connectors (community builders, top barrier = upfront commitment, top feature = group bookings and in-app chat); recommended Connectors as the initial target segment due to higher retention potential
Market Sizing and Competitive Analysis
Sized the North American hobby market: TAM $45B+ (classes, supplies, memberships), SAM $3.6B (in-person class spend in urban metros, ~8% of TAM), SOM $9-15M over 3 years (0.25-0.4% capture, 5-10 cities, 5-15K members)
Conducted competitive landscape analysis positioning ThirdPlace against ClassPass, Skillshare, Airbnb Experiences, Meetup, YouTube DIY, Hobby Boxes, and individual studios across two axes: studio-friendly economics and exploration depth
Identified white space: no competitor combines high studio economics with high exploration depth; ClassPass ($500M) validates marketplace model but is fitness-only
Built a feature comparison matrix across 5 dimensions (activity variety, in-person learning, studio-friendly economics, community-based achievements, social feed) showing ThirdPlace as the only player covering all five
Product Design
Designed ThirdPlace, a dual-sided social marketplace with three core pillars: consolidated discovery platform, social experience layer (group bookings, community features, gamification), and flexible credit-based subscription pricing
Designed a tiered credit-based business model (8/16/32-credit monthly plans with rollover) inspired by and improving upon ClassPass; gave studios full pricing control and opt-in adaptive pricing to fill off-peak slots at competitive rates, with a fixed transparent commission lower than Groupon's 50%
Designed the transformed user journey for both sides: hobbyists move from fragmented search to personalised recommendations, group bookings, and progress tracking; studios move from manual operations to automated bookings, digital check-in, dynamic pricing, and retention nudges
Built and presented a live product demo (UI showing unified discovery feed with smart filters, category browsing, personalised recommendations)
Validation Framework
Built a hypothesis register across three dimensions (desirability, feasibility, viability) with 5 hypotheses, each assigned a risk level, evidence classification, and specific experiment design
Desirability: hobbyists will pay monthly subscription (medium risk, some evidence) — proposed 30-40 user interviews measuring WTP; studios will partner at fair economics (high risk, some evidence) — proposed 20-30 studio interviews targeting 50% interest
Feasibility: booking usability (medium risk, high evidence, deferred) — prototype + 5-10 usability tests; 15+ studios willing to pilot in one city (high risk, some evidence) — pilot partnership program measuring diversity and participation
Viability: hobbyist churn (medium risk, no evidence, leap of faith) — A/B feature testing with subscription monitoring
MMA Datathon
Domain: Marketing Analytics, Causal Inference
Year: Jan 2026
Competed in the Rotman MMA Datathon, placing 1st out of all participating teams
Analysed 6,865+ hours of web traffic data for a retail brand operating across Canada and the US to evaluate paid search campaign effectiveness
Applied causal inference methodology to isolate true campaign impact from organic traffic, separating signal from noise in a noisy, real-world dataset
Quantified ROI by market: identified 35% positive ROI in US markets and loss-making spend in Canada, using causal analysis rather than naive correlation
Translated statistical findings into a concrete business recommendation: reallocate $75-90K in paid search budget from Canada to the US
Delivered findings and recommendations to a panel of judges under competition time constraints
Worked with raw, real-world web traffic data requiring cleaning, segmentation, and interpretation before any modelling could begin
Rotman Design Challenge
Domain: FinTech, Product Design, Problem Discovery &amp; Identification, User Interviews, User Surveys, Prototyping, User Personas &amp; Journey, Product Strategy
Year: March 2026
Designed Compass, an LLM-powered AI agent embedded in Manulife's app, integrating data from Group Benefits, Vitality, and Individual Insurance to help users navigate their coverage — reached finals (top 7 of 43 teams), RDC 2026
Built a three-layer technical architecture: conversational LLM interface, smart data retrieval trained on domain-specific insurance data, and an event-trigger engine responding to life signals (job change, new dependent, policy renewal)
Conducted mixed-methods user research (7 empathy interviews, 38 survey responses) to identify a health-wealth feedback loop — 73% of users left health benefits unused due to navigability failure, not product failure
Validated prototype with real users: 87% would use the tool to find unused benefits, 79% to understand coverage, 62% rated usefulness 7–10/10, and 62% said it would change their view of Manulife
