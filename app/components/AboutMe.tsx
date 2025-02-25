const ProfileCard = () => {
    return (
      <div className="p-8 space-y-4">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">Aryan</h2>
            
          </div>
        </div>
  
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
        I am a prefinal year Computer Science and Engineering student at Dr. B. R. Ambedkar National Institute of Technology, Jalandhar, with a CGPA of 8.26. I am passionate about software development and have hands-on experience in building scalable web applications. Currently, I am focused on projects involving UAV path planning optimization and stock prediction, continually enhancing my skills in the field of technology.

        </p>
  
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
  <h3 className="font-bold mb-2">Achievements</h3>
  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200">
    <li>Contributed to multiple open-source projects and hackathons</li>
    <li>Worked on energy-efficient UAV path planning optimization</li>
    <li>Achieved significant improvements in stock prediction accuracy</li>
  </ul>
</div>

  
  
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Technical Skills and Interests</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200">
            <li>
              <strong>Languages:</strong>
              <ul className="list-none list-inside ml-4">
                <li>→ C</li>
                <li>→ C++</li>
                <li>→ JavaScript</li>
                <li>→ Python</li>
              </ul>
            </li>
            
            <li>
              <strong>Coursework - </strong>
              <ul className="list-none list-inside ml-4">
                <li>→ Object-Oriented Programming</li>
                <li>→ Data Structures and Algorithms</li>
                <li>→ Database Management Systems</li>
                <li>→ Operating Systems</li>
                <li>→ Computer Networks</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    );
  };
  
  export default ProfileCard;
  