import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import useSWR from "swr";
import Link from "next/link";

const StyledContent = styled.div`
  padding-top: 1.5cm; /* Abstand zum Header */
  padding-bottom: 1.5cm; /* Ändere die Höhe nach Bedarf, um Platz für den Footer zu schaffen */
`;

const ExpandableSection = styled.div`
  cursor: pointer;
  margin-top: 15px;
  border-bottom: 2px solid #61dafb;
  padding-bottom: 10px;

  &:hover {
    background-color: #1f1f1f;
  }
`;

const DetailContainer = styled.div`
  padding: 20px;
  background-color: #1e2124;
  color: #61dafb;
`;

const SubSection = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const DetailParagraph = styled.p`
  ffont-size: 18px;
  margin-bottom: 8px;
  text-align: justify;
  color: white;
`;

const DetailsSection = styled.div`
  margin-top: 15px;
  border-top: 2px solid #61dafb;
  padding-top: 15px;
`;

const ButtonDelete = styled.button`
  padding: 0.7rem;
  font-size: 1.2rem;
  background-color: #61dafb;
  color: #282c34;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 0.8rem;
  margin-left: 0.5rem;

  &:hover {
    background-color: #38a169;
  }
`;

const ButtonEdit = styled.button`
  padding: 0.7rem;
  font-size: 1.2rem;
  background-color: #61dafb;
  color: #282c34;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 0.8rem;
  margin-right: 0.5rem;

  &:hover {
    background-color: #38a169;
  }
`;

const StyledLink = styled(Link)`
  position: absolute;
  top: 4.5rem;
  right: 1.5rem;
  padding: 0.8rem;
  font-size: 1.2rem;
  background-color: #61dafb;
  color: #282c34;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;

  &:hover {
    background-color: #38a169;
    text-decoration: underline;
  }
`;

export default function AssessmentResult() {
  const router = useRouter();
  const { id } = router.query;
  const { data: resultAssessment, error } = useSWR(`/api/assessments/${id}`);
  const [highRiskExpanded, setHighRiskExpanded] = useState(false);
  const [gpaiExpanded, setGpaiExpanded] = useState(false);
  const [unacceptableRiskExpanded, setUnacceptableRiskExpanded] =
    useState(false);
  const [
    specificTransparencyRiskExpanded,
    setSpecificTransparencyRiskExpanded,
  ] = useState(false);
  const [minimalRiskExpanded, setMinimalRiskExpanded] = useState(false);

  if (error) return <div>Error loading assessment</div>;
  if (!resultAssessment) return <div>Loading...</div>;

  //DELETE Request
  async function deleteAssessment() {
    await fetch(`/api/assessments/${id}`, {
      method: "DELETE",
    });
    router.push("/");
  }

  //State and Function for Expand Sections

  const toggleHighRiskExpand = () => {
    setHighRiskExpanded(!highRiskExpanded);
  };

  const toggleGpaiExpand = () => {
    setGpaiExpanded(!gpaiExpanded);
  };

  const toggleUnacceptableRiskExpand = () => {
    setUnacceptableRiskExpanded(!unacceptableRiskExpanded);
  };

  const toggleSpecificTransparencyRisk = () => {
    setSpecificTransparencyRiskExpanded(!specificTransparencyRiskExpanded);
  };

  const toggleMinimalRiskExpand = () => {
    setMinimalRiskExpanded(!minimalRiskExpanded);
  };

  //Conditional Rendering based on Result
  const hasUnacceptableRisk =
    resultAssessment?.cognitiveBehavior ||
    resultAssessment?.socialScoring ||
    resultAssessment?.biometricIdentification;

  const hasHighRisk =
    resultAssessment?.useUnderSafetyRegulation ||
    resultAssessment?.useInCertainAre;

  return (
    <StyledContent>
      <DetailContainer>
        <StyledLink href="/">Back</StyledLink>
        <Title>Details for: {resultAssessment?.title}</Title>

        {resultAssessment?.editor ? (
          <DetailParagraph>Editor: {resultAssessment.editor}</DetailParagraph>
        ) : (
          <DetailParagraph>
            Editor: Please add the data via the edit-button in the form.
          </DetailParagraph>
        )}

        {resultAssessment?.company ? (
          <DetailParagraph>Company: {resultAssessment.company}</DetailParagraph>
        ) : (
          <DetailParagraph>
            Company: Please add the data via the edit-button in the form.
          </DetailParagraph>
        )}

        {resultAssessment?.status ? (
          <DetailParagraph>Status: {resultAssessment.status}</DetailParagraph>
        ) : (
          <DetailParagraph>
            Status: Please add the data via the edit-button in the form.
          </DetailParagraph>
        )}

        {resultAssessment.cognitiveBehavior ||
        resultAssessment.socialScoring ||
        resultAssessment.biometricIdentification ? (
          <DetailParagraph>Result: Unacceptable Risk</DetailParagraph>
        ) : resultAssessment.useUnderSafetyRegulation ||
          resultAssessment.useInCertainArea ? (
          <DetailParagraph>Result: High Risk</DetailParagraph>
        ) : resultAssessment.specificTransparencyRisk ? (
          <DetailParagraph>
            Result: There might be some risks for users. Extended transparency
            obligations.
          </DetailParagraph>
        ) : resultAssessment.minimalRisk && !resultAssessment.gpai ? (
          <DetailParagraph>
            Result: Minimal Risk. Only voluntary &quot;obligations&quot;.
          </DetailParagraph>
        ) : null}
        {resultAssessment.gpai ? (
          <DetailParagraph>
            The prerequisites for classification as general-purpose AI are met
            and therefore systematic risks may exist.{" "}
          </DetailParagraph>
        ) : null}

        <Link href={`/assessments/${resultAssessment._id}/edit`}>
          <ButtonEdit>Edit</ButtonEdit>
        </Link>

        <ButtonDelete onClick={deleteAssessment}>Delete</ButtonDelete>

        <Title>Info-Sec:</Title>
        {hasUnacceptableRisk && (
          <ExpandableSection onClick={toggleUnacceptableRiskExpand}>
            <h2>Unacceptable Risks</h2>
          </ExpandableSection>
        )}

        {unacceptableRiskExpanded && (
          <DetailsSection>
            <SubSection>
              <DetailParagraph>
                A very limited set of particularly harmful uses of AI that
                contravene EU values because they violate fundamental rights and
                will therefore be banned:
              </DetailParagraph>
              <ul>
                <li>Social scoring for public and private purposes;</li>
                <li>
                  Exploitation of vulnerabilities of persons, use of subliminal
                  techniques;
                </li>
                <li>
                  Real-time remote biometric identification in publicly
                  accessible spaces by law enforcement, subject to narrow
                  exceptions (see below);
                </li>
                <li>
                  Biometric categorization of natural persons based on biometric
                  data to deduce or infer their race, political opinions, trade
                  union membership, religious or philosophical beliefs or sexual
                  orientation, unless used to identify victims. Filtering of
                  datasets based on biometric data in the area of law
                  enforcement will still be possible;
                </li>
                <li>Individual predictive policing;</li>
                <li>
                  Emotion recognition in the workplace and education
                  institutions, unless for medical or safety reasons (i.e.
                  monitoring the tiredness levels of a pilot);
                </li>
                <li>
                  Untargeted scraping of internet or CCTV for facial images to
                  build-up or expand databases.
                </li>
              </ul>
            </SubSection>
          </DetailsSection>
        )}

        {(resultAssessment?.useUnderSafetyRegulation ||
          resultAssessment?.useInCertainArea) &&
          !hasUnacceptableRisk && (
            <ExpandableSection onClick={toggleHighRiskExpand}>
              <h2>What are the obligations for high-risk AI systems?</h2>
            </ExpandableSection>
          )}

        {highRiskExpanded && (
          <DetailsSection>
            <SubSection>
              <DetailParagraph>
                The AI Act introduces a graduated system of obligations
                according to the level of risk.
              </DetailParagraph>
              <DetailParagraph>
                For high-risk AI systems, the proposal introduces obligations
                such as ensuring that AI systems:
              </DetailParagraph>
              <ul>
                <li>Undergo a conformity assessment by a notified body;</li>
                <li>Meet high-quality data sets to minimize biases;</li>
                <li>
                  Are transparent and provide users with meaningful information;
                </li>
                <li>Have appropriate human oversight;</li>
                <li>
                  Meet specific requirements for documentation and
                  record-keeping;
                </li>
                <li>
                  Adhere to specific requirements when providing information to
                  users;
                </li>
                <li>Are subject to post-market surveillance obligations;</li>
                <li>
                  Do not create or exacerbate bias, discrimination, or other
                  harms.
                </li>
              </ul>
              <DetailParagraph>
                In addition, certain uses of remote biometric identification
                systems by law enforcement are prohibited.
              </DetailParagraph>
              <DetailParagraph>
                The rules will apply directly to entities placing high-risk AI
                systems on the EU market or putting them into service,
                regardless of their location.
              </DetailParagraph>
            </SubSection>
          </DetailsSection>
        )}

        {resultAssessment?.specificTransparencyRisk &&
          !hasUnacceptableRisk &&
          !hasHighRisk && (
            <ExpandableSection onClick={toggleSpecificTransparencyRisk}>
              <h2>Specific Transparency risk</h2>
            </ExpandableSection>
          )}

        {specificTransparencyRiskExpanded && (
          <>
            <DetailsSection>
              <SubSection>
                <DetailParagraph>
                  Specific Transparency risk: For certain AI systems specific
                  transparency requirements are imposed, for example where there
                  is a clear risk of manipulation (e.g. via the use of
                  chatbots). Users should be aware that they are interacting
                  with a machine.
                </DetailParagraph>
              </SubSection>
            </DetailsSection>
          </>
        )}

        {resultAssessment?.gpai && (
          <ExpandableSection onClick={toggleGpaiExpand}>
            <h2>How are general-purpose AI models being regulated?</h2>
          </ExpandableSection>
        )}

        {gpaiExpanded && (
          <>
            <DetailsSection>
              <SubSection>
                <DetailParagraph>
                  General-purpose AI models, including large generative AI
                  models, can be used for a variety of tasks. Individual models
                  may be integrated into a large number of AI systems.
                </DetailParagraph>
                <DetailParagraph>
                  It is important that a provider wishing to build upon a
                  general-purpose AI model has all the necessary information to
                  make sure its system is safe and compliant with the AI Act.
                </DetailParagraph>
                <DetailParagraph>
                  Therefore, the AI Act obliges providers of such models to
                  disclose certain information to downstream system providers.
                  Such transparency enables a better understanding of these
                  models.
                </DetailParagraph>
                <DetailParagraph>
                  Model providers additionally need to have policies in place to
                  ensure that they respect copyright law when training their
                  models.
                </DetailParagraph>
                <DetailParagraph>
                  In addition, some of these models could pose systemic risks
                  because they are very capable or widely used.
                </DetailParagraph>
                <DetailParagraph>
                  For now, general-purpose AI models that were trained using a
                  total computing power of more than 10^25 FLOPs are considered
                  to carry systemic risks, given that models trained with larger
                  compute tend to be more powerful. The AI Office (established
                  within the Commission) may update this threshold in light of
                  technological advances and may furthermore in specific cases
                  designate other models as such based on further criteria (e.g.
                  number of users, or the degree of autonomy of the model).
                </DetailParagraph>
                <DetailParagraph>
                  Providers of models with systemic risks are therefore mandated
                  to assess and mitigate risks, report serious incidents,
                  conduct state-of-the-art tests and model evaluations, ensure
                  cybersecurity and provide information on the energy
                  consumption of their models.
                </DetailParagraph>
                <DetailParagraph>
                  For this, they are asked to engage with the European AI Office
                  to draw up Codes of Conduct as the central tool to detail out
                  the rules in cooperation with other experts. A scientific
                  panel will play a central role in overseeing general-purpose
                  AI models.
                </DetailParagraph>
              </SubSection>
            </DetailsSection>
          </>
        )}

        {resultAssessment?.minimalRisk &&
          !hasUnacceptableRisk &&
          !hasHighRisk &&
          !resultAssessment?.specificTransparencyRisk &&
          !resultAssessment.gpai && (
            <ExpandableSection onClick={toggleMinimalRiskExpand}>
              <h2>Voluntary Obligations</h2>
            </ExpandableSection>
          )}

        {minimalRiskExpanded && (
          <DetailsSection>
            <SubSection>
              <DetailParagraph>
                As a provider of a minimal risk system, you can voluntarily
                choose to apply the requirements for trustworthy AI and follow
                codes of conduct.
              </DetailParagraph>
            </SubSection>
          </DetailsSection>
        )}
      </DetailContainer>
    </StyledContent>
  );
}
