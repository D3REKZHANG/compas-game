import "./References.css";

const References = ({ setGamestate }) => {

  return (
    <div>
      <h1> COMPAS Game </h1>
      <button onClick={() => setGamestate("MENU")}> Back </button>
      <p>References</p>
      <p className="references">
        <span className="reference">Andrews, D. A., Bonta, J., & Hoge, R. D. (1990). Classification for effective rehabilitation: Rediscovering psychology. <i>Criminal Justice and Behavior, 17</i>(1), 19–52. 
          <a href="https://doi.org/10.1177/0093854890017001004" target="_blank">https://doi.org/10.1177/0093854890017001004</a></span><br />

        <span className="reference">Angwin, J., Larson, J., Mattu, S., & Kirchner, L. (2016, May 23). Machine Bias: There’s software used across the country to predict future criminals. And it’s biased against blacks. <i>ProPublica.</i> Retrieved from 
          <a href="https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing" target="_blank">https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing</a></span><br />

        <span className="reference">Dodd, M. A. (2016). Perceptions of factors related to recidivism and recovery. <i>California State University, Fresno, College of Health and Human Services.</i> Retrieved from 
          <a href="https://scholarworks.calstate.edu/downloads/707958915" target="_blank">https://scholarworks.calstate.edu/downloads/707958915</a></span><br />

        <span className="reference">Engel, C., Linhardt, L., & Schubert, M. (2024). Code is law: How COMPAS affects the way the judiciary handles the risk of recidivism. <i>Artificial Intelligence and Law.</i> 
          <a href="https://doi.org/10.1007/s10506-024-09389-8" target="_blank">https://doi.org/10.1007/s10506-024-09389-8</a></span><br />

        <span className="reference">Equal Justice Initiative. (2019). Risk assessment tool led to harsher sentences for young or Black defendants. Retrieved from 
          <a href="https://eji.org/news/risk-assessment-tool-led-to-harsher-sentences-for-young-or-black-defendants/" target="_blank">https://eji.org/news/risk-assessment-tool-led-to-harsher-sentences-for-young-or-black-defendants/</a></span><br />

        <span className="reference">Flores, A. W., Bechtel, K., & Lowenkamp, C. T. (2016). False positives, false negatives, and false analyses: A rejoinder to “Machine bias: There’s software used across the country to predict future criminals. And it’s biased against blacks.” <i>Federal Sentencing Reporter, 28</i>(1), 1-13. 
          <a href="https://doi.org/10.1525/fsr.2016.28.1.1" target="_blank">https://doi.org/10.1525/fsr.2016.28.1.1</a></span><br />

        <span className="reference">Ji, Z., Chen, D., Ishii, E., Cahyawijaya, S., Bang, Y., Wilie, B., & Fung, P. (2024). LLM internal states reveal hallucination risk faced with a query. In <i>Proceedings of the 7th BlackboxNLP Workshop: Analyzing and Interpreting Neural Networks for NLP</i> (pp. 88–104). Miami, Florida, US: Association for Computational Linguistics.</span><br />

        <span className="reference">Larson, J., Mattu, S., Kirchner, L., & Angwin, J. (2016, May 23). How we analyzed the COMPAS recidivism algorithm. <i>ProPublica.</i> 
          <a href="https://www.propublica.org/article/how-we-analyzed-the-compas-recidivism-algorithm" target="_blank">https://www.propublica.org/article/how-we-analyzed-the-compas-recidivism-algorithm</a></span><br />

        <span className="reference">Lin, Z., Guan, S., Zhang, W., et al. (2024). Towards trustworthy LLMs: A review on debiasing and dehallucinating in large language models. <i>Artificial Intelligence Review, 57</i>, 243. 
          <a href="https://doi.org/10.1007/s10462-024-10896-y" target="_blank">https://doi.org/10.1007/s10462-024-10896-y</a></span><br />

        <span className="reference">Northpointe. (2015, March 13). Practitioner’s guide to COMPAS core. Electronic Privacy Information Center (EPIC). 
          <a href="https://archive.epic.org/algorithmic-transparency/crim-justice/EPIC-16-06-23-WI-FOIA-201600805-COMPASPractionerGuide.pdf" target="_blank">https://archive.epic.org/algorithmic-transparency/crim-justice/EPIC-16-06-23-WI-FOIA-201600805-COMPASPractionerGuide.pdf</a></span><br />

        <span className="reference">Patalay, P. (2023, November 21). COMPAS: Unfair algorithm? <i>Medium.</i> Retrieved from 
          <a href="https://medium.com/@lamdaa/compas-unfair-algorithm-812702ed6a6a" target="_blank">https://medium.com/@lamdaa/compas-unfair-algorithm-812702ed6a6a</a></span><br />

        <span className="reference">Staudt, S. (2025). The myth of the "revolving door:" Challenging misconceptions about recidivism. <i>Prison Policy Initiative.</i> 
          Retrieved from 
          <a href="https://www.prisonpolicy.org/trainings/recidivism.html" target="_blank">https://www.prisonpolicy.org/trainings/recidivism.html</a></span><br />

        <span className="reference">Su, W., Wang, C., Ai, Q., Hu, Y., Wu, Z., Zhou, Y., & Liu, Y. (2024). Unsupervised real-time hallucination detection based on the internal states of large language models. In <i>Findings of the Association for Computational Linguistics: ACL 2024</i> (pp. 14379–14391). Bangkok, Thailand: Association for Computational Linguistics.</span><br />

        <span className="reference">Zhang, Y., Cui, L., Bi, W., & Shi, S. (2024). Alleviating hallucinations of large language models through induced hallucinations. <i>arXiv.</i> 
          <a href="https://arxiv.org/abs/2312.15710" target="_blank">https://arxiv.org/abs/2312.15710</a></span>
        <p>
          Image From https://www.istockphoto.com/vector/concept-of-judge-gm1404501041-456707310
        </p>
      </p>
    </div>
  );
};

export { References };
