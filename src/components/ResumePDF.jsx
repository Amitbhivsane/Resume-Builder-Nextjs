"use client";

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: "Helvetica",
  },

  header: {
    textAlign: "center",
    marginBottom: 15,
    borderBottom: "1 solid #000",
    paddingBottom: 10,
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
  },

  section: {
    marginTop: 10,
  },

  title: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 5,
    borderBottom: "1 solid #ccc",
    paddingBottom: 2,
  },

  text: {
    fontSize: 10,
    lineHeight: 1.5,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  link: {
    color: "blue",
    textDecoration: "underline",
  },
});

export default function ResumePDF({ resumeData }) {
  const {
    personal,
    skills,
    education,
    experience,
    projects,
    certifications,
  } = resumeData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.name}>{personal.fullName}</Text>

          <Text>
            {personal.email} | {personal.phone}
          </Text>

          <Text>{personal.location}</Text>

          {personal.linkedin && (
            <Link style={styles.link} src={personal.linkedin}>
              LinkedIn
            </Link>
          )}

          {personal.github && (
            <Link style={styles.link} src={personal.github}>
              GitHub
            </Link>
          )}
        </View>

        {/* SUMMARY */}
        <View style={styles.section}>
          <Text style={styles.title}>Professional Summary</Text>
          <Text style={styles.text}>{personal.summary}</Text>
        </View>

        {/* EXPERIENCE */}
        <View style={styles.section}>
          <Text style={styles.title}>Experience</Text>

          {experience.map((exp, i) => (
            <View key={i} style={{ marginBottom: 8 }}>
              <View style={styles.row}>
                <Text>
                  {exp.position} - {exp.company}
                </Text>

                <Text>
                  {exp.startDate} - {exp.endDate}
                </Text>
              </View>

              <Text style={styles.text}>
                {exp.description}
              </Text>
            </View>
          ))}
        </View>

        {/* PROJECTS */}
        <View style={styles.section}>
          <Text style={styles.title}>Projects</Text>

          {projects.map((project, i) => (
            <View key={i} style={{ marginBottom: 6 }}>
              <Text>{project.name}</Text>

              <Text>{project.description}</Text>

              {project.link && (
                <Link
                  style={styles.link}
                  src={project.link}
                >
                  View Project
                </Link>
              )}
            </View>
          ))}
        </View>

        {/* SKILLS */}
        <View style={styles.section}>
          <Text style={styles.title}>Skills</Text>

          <Text>{skills.join(" • ")}</Text>
        </View>

        {/* EDUCATION */}
        <View style={styles.section}>
          <Text style={styles.title}>Education</Text>

          {education.map((edu, i) => (
            <View key={i}>
              <Text>
                {edu.degree} in {edu.fieldOfStudy}
              </Text>

              <Text>{edu.school}</Text>
            </View>
          ))}
        </View>

        {/* CERTIFICATIONS */}
        <View style={styles.section}>
          <Text style={styles.title}>Certifications</Text>

          {certifications.map((cert, i) => (
            <Text key={i}>
              {cert.name} - {cert.issuer}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}